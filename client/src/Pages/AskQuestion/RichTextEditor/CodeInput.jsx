import React, { useEffect, useRef } from "react";

const CodeInput = ({ Code, setCode, setCodeDiv }) => {
  return (
    <div className="code-input-container">
      <h4>Add Code </h4>
      <textarea
        className="code-input"
        placeholder="Enter your code here..."
        value={Code}
        onChange={(e) => {
          setCode(e.target.value);

        }}
      />
      <div className="code-btns">
        <button type="button" onClick={()=>setCodeDiv(false)}>Done</button>
        <p
          onClick={() => {
            setCode("");
            setCodeDiv(false);
          }}
        >
          Cancel
        </p>
      </div>
    </div>
  );
};

export default CodeInput;
