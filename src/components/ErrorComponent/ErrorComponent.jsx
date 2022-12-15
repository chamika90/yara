import React from "react";
import "./errorComponent.css";

export default function ErrorComponent({message}) {
  return (
    <div  className="container">
      <p data-test-id="errorMessage">{message}</p>
    </div>
  );
}