import React from "react";
import "./errorComponent.css";

export default function ErrorComponent(message) {
  return (
    <div className="container">
      {message}
    </div>
  );
}