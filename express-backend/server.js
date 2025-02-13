const express = require('express');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('node:fs');

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let userInput = {};
let chatHistory = [];

app.post('/api/input', upload.array('file'), (req, res) => {
  const { message } = req.body;
  const files = req.files;
  userInput = { message, files };
  res.json({ status: 'success', message: 'Input received!' });
});

app.get('/api/gemini', async (req, res) => {
  const userPrompt = userInput.message;

  if (!userPrompt) {
    return res.status(400).json({ error: "No input message available." });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `You are a note beautifying system. If a user sends some text which can be unstructured notes, audio/video transcripts, handwritten text images, or anything if it can be turned into notes, if a user sends any of these in the input you have to give the output in this format:
      {
        summary: summary of the entire input after properly decoding and understanding it,
        concepts_diagram: any concept that would be easier to understand with a diagram, you can list all such concepts in an array,
        diagram_prompts: for all the concepts of the above array, create another array having prompts to give DALLE image generation model to give proper diagrams for them for educational purposes,
        concepts_flowcharts: same as diagrams but for flow charts,
        flowcharts_prompt: give graphviz.js code for each concept of the above array in another array to create flowchart out of them
      }`
    });

    chatHistory.push({
      role: "user",
      parts: [{ text: userPrompt }],
    });

    const chat = model.startChat({ history: chatHistory });

    const result = await chat.sendMessage(userPrompt);
    const modelResponse = result.response.text();

    chatHistory.push({
      role: "model",
      parts: [{ text: modelResponse }],
    });

    res.json({ result: modelResponse });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Failed to generate text from Gemini API", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
