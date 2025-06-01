// import fs from "fs";
// import FormData from "form-data";
// import axios from "axios";

// async function convertVoice() {
//   const filePath = "./suri.wav";

//   const url = "https://api.murf.ai/v1/voice-changer/convert";
//   const form = new FormData();

//   // Read the file as a stream and append it to the form
//   const fileStream = fs.createReadStream(filePath);
//   form.append("file", fileStream, "hello_world.mp3"); // Add file name explicitly
//   form.append("voice_id", "en-US-terrell");

//   try {
//     const response = await axios.post(url, form, {
//       headers: {
//         "api-key": "DK145ee4918-a393-4784-bb24-f84fe829e4a2",
//       },
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error(error.response ? error.response.data : error.message);
//   }
// }

// convertVoice();
const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");

async function convertVoice() {
  const filePath = "./suri.wav";

  const url = "https://api.murf.ai/v1/voice-changer/convert";
  const form = new FormData();

  // Read the file as a stream and append it to the form
  const fileStream = fs.createReadStream(filePath);
  form.append("file", fileStream, "hello_world.mp3"); // Add file name explicitly
  form.append("voice_id", "en-US-terrell");

  try {
    const response = await axios.post(url, form, {
      headers: {
        "api-key": "DK145ee4918-a393-4784-bb24-f84fe829e4a2",
        ...form.getHeaders(),
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}

convertVoice();
