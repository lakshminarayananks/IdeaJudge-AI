const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
const evaluateRoutes = require("./routes/evaluateRoutes");

app.use("/api", evaluateRoutes);

// test route
app.get("/", (req, res) => {
  res.send("IdeaJudge AI Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(process.env.GEMINI_API_KEY);