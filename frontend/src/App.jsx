import { useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

import "./App.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [role, setRole] = useState("Competition Judge");
  const [ideaTitle, setIdeaTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const evaluateIdea = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
  "https://ideajudge-ai.onrender.com",
  {
    role,
    inputText: `Idea Title: ${ideaTitle}\nDescription: ${description}`,
  }
);

      setScore(res.data.score || 75);
      setResult(res.data.evaluation);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Error connecting to backend");
    }
  };

  const pieData = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [score || 0, 100 - (score || 0)],
        backgroundColor: ["#10B981", "#60A5FA"],
        borderColor: ["#059669", "#2563EB"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🚀 IdeaJudge AI</h1>
        <p>Multi Perspective Project Evaluation System</p>

        <label>Evaluator Type</label>
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setResult("");
            setScore(null);
          }}
        >
          <option>Competition Judge</option>
          <option>Professor</option>
          <option>Investor</option>
          <option>Customer</option>
        </select>

        <label>Idea Title</label>
        <input
          type="text"
          placeholder="Enter project title"
          value={ideaTitle}
          onChange={(e) => {
            setIdeaTitle(e.target.value);
            setResult("");
            setScore(null);
          }}
        />

        <label>Project Description</label>
        <textarea
          rows="6"
          placeholder="Describe your project idea..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setResult("");
            setScore(null);
          }}
        />

        <button onClick={evaluateIdea} disabled={loading}>
          {loading ? "⏳ Evaluating..." : "🚀 Evaluate Idea"}
        </button>

        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
            <p>AI is evaluating your idea...</p>
          </div>
        )}

        {score !== null && (
          <>
            <div className="score-card">
              Score: {score}/100
            </div>

            <div className="chart-container">
              <Pie data={pieData} />
            </div>
          </>
        )}

        {result && (
          <div className="result">
            <h2>Evaluation Result</h2>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;