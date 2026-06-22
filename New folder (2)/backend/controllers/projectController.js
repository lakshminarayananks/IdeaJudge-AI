const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const evaluateIdea = async (req, res) => {
  try {
    const { role, idea } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a ${role}.

Evaluate this project idea:
${idea}

Give:
1. Score out of 100
2. Strengths
3. Weaknesses
4. Suggestions for improvement
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({
      success: true,
      feedback: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { evaluateIdea };