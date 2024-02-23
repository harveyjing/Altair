import React, { useEffect, useState } from "react";
import CodeEditor from "./components/CodeEditor";
import OutputSection from "./components/OutputSection";
import { saveToLocalStorage, loadFromLocalStorage } from "./lib/localstorage";
const App = () => {
  const [output, setOutput] = useState("");
  const [executionList, setExecutionList] = useState([]);
  useEffect(() => {
    const res = loadFromLocalStorage();
    setExecutionList(res);
  }, []);

  const executeCode = async (code) => {
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        body: code,
      });

      const result = await response.text();
      setOutput(result);
      const timestamp = new Date().toLocaleString();
      setExecutionList((prevList) => [
        {
          code,
          output: result,
          timestamp,
        },
        ...prevList,
      ]);

      if (response.ok) {
        saveToLocalStorage({ code, output: result, timestamp });
      }
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className=" container flex flex-col min-h-screen font-mono">
        <CodeEditor onExecute={executeCode} />
        <OutputSection output={output} />
        {executionList.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold">Execution List:</h2>
            <ul className="flex flex-col gap-2">
              {executionList.map((execution, index) => (
                <li className="border p-2" key={index}>
                  <strong>Timestamp:</strong> {execution.timestamp}
                  <br />
                  <strong>Code:</strong>
                  <pre>{execution.code}</pre>
                  <strong>Output:</strong>
                  <pre>{execution.output}</pre>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
