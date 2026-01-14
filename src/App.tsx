import "./App.scss";
import { Grid, Ruler } from "../lib";
import { useState, type ReactNode } from "react";
import { classNames } from "../lib/utils/classNames";
import { GridExample, LabelExample, UnitsExample } from "./examples";
import { RulerExample } from "./examples/RulerExample";
import { AxisExample } from "./examples/AxisExample";

function NavLink({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <li className="NavLink">
      <button onClick={onClick}>{children}</button>
    </li>
  );
}

function App() {
  const [example, setExample] = useState("");
  const clickHandler = (id: string) => () => {
    setExample(id);
  };

  return (
    <div className={classNames("App", example !== "" && "examples")}>
      <h1 className="logo">
        GD Measurements
        {example === "" && (
          <Ruler position="absolute" location="bottom" labels />
        )}
      </h1>

      <nav className="navigation">
        {example === "" && (
          <>
            <h3>Components:</h3>
            <ul>
              <NavLink onClick={clickHandler("label")}>Label</NavLink>
              <NavLink onClick={clickHandler("units")}>Units</NavLink>
              <NavLink onClick={clickHandler("ruler")}>Ruler</NavLink>
              <NavLink onClick={clickHandler("grid")}>Grid</NavLink>
              <NavLink onClick={clickHandler("axis")}>Axis</NavLink>
            </ul>
            <Grid labels position="absolute" />
          </>
        )}
        {example !== "" && (
          <ul>
            <NavLink onClick={clickHandler("")}>Back to examples</NavLink>
          </ul>
        )}
      </nav>

      {example === "label" && <LabelExample />}
      {example === "units" && <UnitsExample />}
      {example === "ruler" && <RulerExample />}
      {example === "grid" && <GridExample />}
      {example === "axis" && <AxisExample />}
    </div>
  );
}

export default App;
