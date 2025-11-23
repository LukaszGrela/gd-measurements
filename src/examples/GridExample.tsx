import { useMemo, useState, type SVGAttributes } from "react";
import { Grid } from "../../lib";
import type { TPosition } from "../../lib/types/common";
import type { TUnits } from "../../lib/grid/types";

export const GridExample = () => {
  const [debug, setDebug] = useState(true);

  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [subdivision, setSubdivision] = useState(5);
  const [position, setPosition] = useState<TPosition>("fixed");
  const [showLabels, setShowLabels] = useState(false);

  const [changeConfig, setChangeConfig] = useState(false);
  const [hx, setHXOffset] = useState(0);
  const [hy, setHYOffset] = useState(0);
  const [vx, setVXOffset] = useState(0);
  const [vy, setVYOffset] = useState(0);
  const [zx, setZXOffset] = useState(10);
  const [zy, setZYOffset] = useState(0);

  const [unitsWidth, setUnitsWidth] = useState(50);
  const [unitsHeight, setUnitsHeight] = useState(50);

  const [rotation, setRotation] = useState(0);
  const [anchor, setAnchor] = useState<"start" | "middle" | "end">("start");
  const [alignment, setAlignment] = useState<
    "text-before-edge" | "middle" | "text-after-edge"
  >("text-before-edge");

  const config = useMemo((): TUnits | boolean => {
    if (!changeConfig) return showLabels;

    return {
      hOffset: { x: hx, y: hy },
      vOffset: { x: vx, y: vy },

      zero: { x: zx, y: zy },

      size: {
        width: unitsWidth,
        height: unitsHeight,
      },
    };
  }, [
    changeConfig,
    hx,
    hy,
    showLabels,
    unitsHeight,
    unitsWidth,
    vx,
    vy,
    zx,
    zy,
  ]);

  return (
    <div
      style={{
        border: "1px solid red",
        position: "relative",
        maxWidth: "80vw",
        minHeight: "50vh",
        margin: "0 auto",
      }}
    >
      <div className="controls">
        <h2>Grid example</h2>
        <h3>Controls</h3>
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={debug}
              onChange={(e) => setDebug(e.target.checked)}
            />
            Debug
          </label>
        </div>

        <div className="control-group">
          <label>
            Position:
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as TPosition)}
            >
              {["fixed", "absolute"].map((value, index) => (
                <option key={`${index}-${value}`} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="control-group">
          <label>
            Grid size: width
            <input
              type="number"
              min="0"
              max="150"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
            , height
            <input
              type="number"
              min="0"
              max="150"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="control-group">
          <label>
            Subdivisions:
            <input
              type="number"
              min="2"
              max="20"
              value={subdivision}
              onChange={(e) => setSubdivision(Number(e.target.value))}
            />
            , height
            <input
              type="number"
              min="0"
              max="50"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
            />
            Show labels
          </label>
        </div>

        <h4>Label config</h4>
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={changeConfig}
              onChange={(e) => setChangeConfig(e.target.checked)}
            />
            Edit config
          </label>
        </div>

        {changeConfig && (
          <div>
            <div className="control-group">
              <label>
                Alignment:
                <select
                  value={alignment}
                  onChange={(e) =>
                    setAlignment(
                      e.target.value as
                        | "text-before-edge"
                        | "middle"
                        | "text-after-edge"
                    )
                  }
                >
                  {(
                    [
                      "text-before-edge",
                      "middle",
                      "text-after-edge",
                    ] as Exclude<
                      SVGAttributes<SVGTSpanElement>["alignmentBaseline"],
                      undefined
                    >[]
                  ).map((value, index) => (
                    <option key={`${index}-${value}`} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="control-group">
              <label>
                Anchor:
                <select
                  value={anchor}
                  onChange={(e) =>
                    setAnchor(e.target.value as "start" | "middle" | "end")
                  }
                >
                  {["start", "middle", "end"].map((value, index) => (
                    <option key={`${index}-${value}`} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="control-group">
              <label>
                Rotation: {rotation}
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="45"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                />
              </label>
            </div>

            <div className="control-group">
              <label>
                Units size: width
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={unitsWidth}
                  onChange={(e) => setUnitsWidth(Number(e.target.value))}
                />
                , height
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={unitsHeight}
                  onChange={(e) => setUnitsHeight(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Horizontal label offset: x
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={hx}
                  onChange={(e) => setHXOffset(Number(e.target.value))}
                />
                , y
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={hy}
                  onChange={(e) => setHYOffset(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Vertical label offset: x
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={vx}
                  onChange={(e) => setVXOffset(Number(e.target.value))}
                />
                , y
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={vy}
                  onChange={(e) => setVYOffset(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Zero label offset: x
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={zx}
                  onChange={(e) => setZXOffset(Number(e.target.value))}
                />
                , y
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={zy}
                  onChange={(e) => setZYOffset(Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      <Grid
        position={position}
        labels={config}
        debug={debug}
        grid={{
          width,
          height,
          subdivision,
        }}
      />
    </div>
  );
};
