import "./App.css";
import { UnitsExample } from "./examples/UnitsExample";
import { GridExample, LabelExample } from "./examples";
import { RulerExample } from "./examples/RulerExample";

function App() {
  return (
    <>
      <h1>GD Measurements</h1>
      <RulerExample />
      <br />
      <GridExample />
      {/* 
      <div style={{ position: "relative" }}>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <Ruler
          location="top"
          orientation="horizontal"
          position="absolute"
          labels
          // labels={{
          //   offset: { x: 2, y: 25 },
          //   zero: { x: 10, y: 25 },
          //   size: 50,
          // }}
        /> 
        <AxisV position="absolute" />
      </div>
        */}
      {/* <div className="card" style={{ position: "relative" }}>
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
        <Ruler
          location="bottom"
          orientation="horizontal"
          position="absolute"
          // labels
          labels={{
            offset: { x: 20, y: 0 },
            size: 50,
            zero: { x: 10, y: 0 },
          }}
        />
        <AxisH position="absolute" />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <LabelExample />
      <UnitsExample />
    </>
  );
}

export default App;
