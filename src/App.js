import React, { useState } from "react";
import axios from "axios";
import Suggestions from "./routes/Suggestions"; // import Suggestions component

function App() {
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleReplacementClick = (replacement) => {
    const words = inputText.trim().split(" ");
    words[words.length - 1] = replacement;
    setInputText(words.join(" ") + " ");
    setSuggestions([]);
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    const words = text.split(" ");
    const lastWord = words[words.length - 1];

    if (lastWord) fetchSuggestions(lastWord);
    else setSuggestions([]);
  };

  const fetchSuggestions = async (text) => {
    if (!text) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.languagetool.org/v2/check",
        new URLSearchParams({ text, language: "en-US" }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      setSuggestions(response.data.matches.slice(0, 10));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        background: "#e9f0f7",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "60px 40px",
          margin: "10px",
          borderRadius: "15px",
          boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
          width: "85%",
          maxWidth: "550px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "30px", fontWeight: "600" }}>
          My Grammar App
        </h1>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Type here..."
            value={inputText}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "12px 15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
              fontFamily: "Arial, sans-serif",
            }}
          />
          <button
            type="button"
            onClick={() => alert(inputText)}
            style={{
              padding: "12px 25px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setInputText("");
              setSuggestions([]);
            }}
            style={{
              padding: "12px 25px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#ad1113ff",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Exit
          </button>
        </div>

        {/* Use the Suggestions component here */}
        <Suggestions
          suggestions={suggestions}
          handleReplacementClick={handleReplacementClick}
        />
      </div>
    </div>
  );
}

export default App;
