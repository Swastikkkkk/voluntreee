import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import { Client } from "@gradio/client";
import fs from "fs";
import cors from "cors";
import { Blob } from "buffer";
import dotenv from "dotenv";

dotenv.config(); // Loads OPENCAGE_API_KEY from .env

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.post("/predict", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const imageBuffer = fs.readFileSync(filePath);
    const imageBlob = new Blob([imageBuffer], { type: req.file.mimetype });

    // Connect to Gradio model
    const client = await Client.connect("yunusserhat/Location_Predictor");
    const result = await client.predict("/predict", { image: imageBlob });

    fs.unlinkSync(filePath); // Delete uploaded file

    let rawText = result.data;

    // If array, take first item
    if (Array.isArray(rawText)) {
      rawText = rawText[0];
    }

    // Clean HTML if present
    const cleanedText =
      typeof rawText === "string"
        ? rawText.replace(/<[^>]*>/g, "").trim()
        : rawText;

    console.log("🧪 Cleaned output:", cleanedText);

    // Extract coordinates using regex
    const latLonRegex = /(-?\d{1,3}\.\d+)[^\d-]*(-?\d{1,3}\.\d+)/;
    const match = cleanedText.match(latLonRegex);

    if (!match) {
      throw new Error("Coordinates not found in prediction output.");
    }

    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);

    console.log(`📍 Extracted coordinates: ${latitude}, ${longitude}`);

    // Reverse geocoding with OpenCage
    const apiKey = process.env.OPENCAGE_API_KEY;
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    const geoResponse = await fetch(geocodeUrl);
    const geoData = await geoResponse.json();

    const readableLocation =
      geoData?.results?.[0]?.formatted || "Unknown location";

    console.log(`🌍 Location resolved: ${readableLocation}`);

    res.json({
      location: readableLocation,
      coordinates: { latitude, longitude },
    });
  } catch (err) {
    console.error("❌ Prediction Error:", err);
    res.status(500).json({ error: "Prediction failed. Please try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
