const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const API_KEY = "DK171dc9800-504a-4cbe-9a00-28b0adedafb9"; // <-- Replace with your Murf Dub Automation API key

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running!" });
});

// Create Dub Job
app.post("/api/dub", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error_message: "No file uploaded", error_code: 400 });
    }
    let locales = req.body.target_locales;
    if (!locales) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error_message: "No target locales provided", error_code: 400 });
    }
    if (!Array.isArray(locales)) locales = [locales];

    const form = new FormData();
    form.append("file", fs.createReadStream(req.file.path), req.file.originalname);
    form.append("file_name", req.file.originalname);
    locales.forEach(locale => form.append("target_locales", locale));

    const response = await axios.post(
      "https://api.murf.ai/v1/murfdub/jobs/create",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "api-key": API_KEY,
        },
      }
    );

    fs.unlinkSync(req.file.path);
    res.json(response.data);

  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    if (error.response) {
      res.status(500).json({
        error_message: error.response.data.message || "Murf API error",
        error_code: error.response.data.error_code || 500
      });
    } else {
      res.status(500).json({
        error_message: error.message || "Internal server error",
        error_code: 500
      });
    }
  }
});

// Check Job Status
app.get("/api/dub/status/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    const response = await axios.get(
      `https://api.murf.ai/v1/murfdub/jobs/${jobId}/status`,
      { headers: { "api-key": API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(500).json({
        error_message: error.response.data.message || "Murf API error",
        error_code: error.response.data.error_code || 500
      });
    } else {
      res.status(500).json({
        error_message: error.message || "Internal server error",
        error_code: 500
      });
    }
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
