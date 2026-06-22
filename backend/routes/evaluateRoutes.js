const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/evaluate", async (req, res) => {
  try {
    const { role, inputText } = req.body;

    if (!inputText) {
      return res.status(400).json({
        success: false,
        error: "Idea is required"
      });
    }

    const prompt = `
You are a professional startup idea evaluator AI.

Evaluate this idea:

Role: ${role || "Student"}
Idea: ${inputText}

Return in this format:

Score: /100

Strengths:
- Point 1
- Point 2

Weaknesses:
- Point 1
- Point 2

Improvements:
- Point 1
- Point 2

Final Verdict:
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = response.data.choices[0].message.content;

    res.json({
      success: true,
      evaluation: text
    });

  } catch (err) {
    console.error("OpenRouter Error:", err.response?.data || err.message);

    res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });
  }
});

module.exports = router;