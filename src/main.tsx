import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import { Ruler } from "../lib/ruler/Ruler.tsx";
import { AxisH } from "../lib/center/AxisH.tsx";
import { AxisV } from "../lib/center/AxisV.tsx";
// import { Grid } from "../lib/grid/Grid.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <Ruler
      orientation="horizontal"
      location="bottom"
      // labels={{
      //   skipZero: true,
      //   offset: { x: 5, y: 20 },
      //   size: 50,
      // }}
      labels
    /> */}
    {/* <Ruler
      location="right"
      // labels={{
      //   skipZero: true,
      //   offset: { x: 20, y: -5 },
      //   size: 200,
      // }}
      labels
      // labels={{
      //   size: 50,
      //   offset: { x: 25, y: 27 },
      // }}
    /> */}
    {/* <Ruler
      location="left"
      // labels={{
      //   skipZero: true,
      //   offset: { x: 20, y: -5 },
      //   size: 200,
      // }}
      labels
      // labels={{
      //   size: 50,
      //   offset: { x: 15, y: -2 },
      // }}
    /> */}
    {/*
     <Ruler />
    <Ruler orientation="horizontal" location="bottom" />
    */}
    {/*
    <Grid
      // grid={{
      //   width: 100,
      //   height: 100,
      //   subdivision: 5,
      // }}
      // labels={{
      //   hOffset: { x: 5, y: 10 },
      //   vOffset: { x: 10, y: -5 },

      //   zero: { x: 20, y: 10 },

      //   size: {
      //     width: 200,
      //     height: 200,
      //   },
      // }}
      labels
    />
    */}
    <AxisH />
    <AxisV />
  </StrictMode>
);
