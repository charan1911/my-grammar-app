// src/Suggestions.js
import React from "react";

const Suggestions = ({ suggestions, handleReplacementClick }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        justifyContent: "flex-start",
      }}
    >
      {suggestions
        .flatMap((s) => s.replacements) // flatten all replacements
        .slice(0, 10) // top 10 suggestions
        .map((r, index) => (
          <span
            key={index}
            onClick={() => handleReplacementClick(r.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              background: "#e0f0ff",
              color: "#1a73e8",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#1a73e8";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#e0f0ff";
              e.target.style.color = "#1a73e8";
            }}
          >
            {r.value}
          </span>
        ))}
    </div>
  );
};

export default Suggestions;
