import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Ruler } from "../lib/ruler/Ruler.tsx";
// import { Grid } from "./measurements/grid/Grid.tsx";
import { AxisH } from "../lib/center/AxisH.tsx";
import { AxisV } from "../lib/center/AxisV.tsx";
import { Grid } from "../lib/grid/Grid.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Ruler orientation="horizontal" location="top" />
    <Ruler location="right" />
    {/*
     <Ruler />
    <Ruler orientation="horizontal" location="bottom" />
    */}
    <Grid
      // grid={{
      //   width: 100,
      //   height: 100,
      //   subdivision: 5,
      // }}
      labels={{
        hOffset: { x: 5, y: 10 },
        vOffset: { x: 10, y: -5 },

        zero: { x: 20, y: 10 },

        size: {
          width: 100,
          height: 100,
        },
      }}
      // labels
    />
    <AxisH />
    <AxisV />
  </StrictMode>
);
