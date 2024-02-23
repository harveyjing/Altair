import React, { useState } from "react";

const CodeEditor = ({ onExecute, onSave }) => {
  const [code, setCode] = useState("");

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleExecute = () => {
    onExecute(code);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className=" text-3xl text-black font-semibold">Input you code:</h2>
      <textarea
        className="border border-slate-600 shadow"
        value={code}
        onChange={handleCodeChange}
        rows={10}
        cols={50}
      />
      <div className="flex justify-center items-center gap-2">
        <button
          className="border px-2 py-0.5 bg-slate-50 shadow rounded-sm"
          onClick={handleExecute}
        >
          Execute
        </button>

        {/* <button
          className="border px-2 py-0.5 bg-slate-50 shadow rounded-sm"
          onClick={handleSave}
        >
          Save
        </button> */}
      </div>
    </div>
  );
};

export default CodeEditor;
