import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Grid } from "../lib/grid/Grid";
import { Ruler } from "../lib/ruler/Ruler";
import { AxisH } from "../lib/center/AxisH";
import { AxisV } from "../lib/center/AxisV";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ position: "relative" }}>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <Ruler location="bottom" orientation="horizontal" position="absolute" />
        <AxisV position="absolute" />
      </div>
      <h1>Vite + React</h1>
      <div className="card" style={{ position: "relative" }}>
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{ position: "relative" }}
        >
          count is {count}
          <Grid position="absolute" />
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Ruler location="left" orientation="vertical" position="absolute" />
        <AxisH position="absolute" />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
