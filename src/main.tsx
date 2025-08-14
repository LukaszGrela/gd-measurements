import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Ruler } from "./measurements/ruler/Ruler.tsx";
import { Grid } from "./measurements/grid/Grid.tsx";
import { AxisH } from "./measurements/center/AxisH.tsx";
import { AxisV } from "./measurements/center/AxisV.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <Ruler />
    <Ruler orientation="horizontal" location="top" />
    <Ruler location="right" />
    <Ruler orientation="horizontal" location="bottom" />
    <Grid /> */}
    <AxisH />
    <AxisV />
  </StrictMode>
);
