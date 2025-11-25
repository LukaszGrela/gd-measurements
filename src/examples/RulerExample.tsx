import { useCallback, useMemo, useState, type SVGAttributes } from "react";
import { Ruler } from "../../lib";
import type { TPosition } from "../../lib/types/common";
import type { TLocation, TUnit } from "../../lib/ruler/types";

export const RulerExample = () => {
  const [debug, setDebug] = useState(false);
  const [skipZero, setSkipZero] = useState(false);
  const [position, setPosition] = useState<TPosition>("absolute");

  const [location, setLocation] = useState<TLocation>("left");
  const [size, setSize] = useState(100);
  const [subdivisions, setSubdivisions] = useState(10);
  const [width, setWidth] = useState(25);
  const [overrideWidth, setOverrideWidth] = useState(false);
  const [mainTickWidth, setMainTickWidth] = useState(25);
  const [edge, setEdge] = useState(3);
  const [tickWidth, setTickWidth] = useState(10);
  const [halfTickWidth, setHalfTickWidth] = useState(20);
  const [showHalfTick, setShowHalfTick] = useState(false);

  const [showLabels, setShowLabels] = useState(false);

  const [x, setXOffset] = useState(0);
  const [y, setYOffset] = useState(0);
  const [zx, setZXOffset] = useState(10);
  const [zy, setZYOffset] = useState(0);
  const [unitSize, setUnitSize] = useState(50);
  const [changeConfig, setChangeConfig] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [anchor, setAnchor] = useState<"start" | "middle" | "end">("start");
  const [alignment, setAlignment] = useState<
    "text-before-edge" | "middle" | "central" | "text-after-edge"
  >("text-before-edge");

  const [zRotation, setZRotation] = useState(0);
  const [zAnchor, setZAnchor] = useState<"start" | "middle" | "end">("start");
  const [zAlignment, setZAlignment] = useState<
    "text-before-edge" | "middle" | "central" | "text-after-edge"
  >("text-before-edge");

  const setDefaults = useCallback(() => {
    setDebug(false);
    setSkipZero(false);
    setPosition("absolute");
    setLocation("left");
    setSize(100);
    setSubdivisions(10);
    setWidth(25);
    setOverrideWidth(false);
    setMainTickWidth(25);
    setEdge(3);
    setTickWidth(10);
    setHalfTickWidth(20);
    setShowHalfTick(false);
    setShowLabels(false);
    setXOffset(0);
    setYOffset(0);
    setZXOffset(0);
    setZYOffset(0);
    setUnitSize(50);
    setChangeConfig(false);
    setRotation(0);
    setAnchor("start");
    setAlignment("text-before-edge");
    setZRotation(0);
    setZAnchor("start");
    setZAlignment("text-before-edge");
  }, []);

  const config = useMemo((): TUnit | boolean => {
    if (!showLabels) return false;
    if (showLabels && !changeConfig) return true;

    return {
      size: unitSize,
      offset: { x, y },
      zero: { x: zx, y: zy },

      labelConfig: {
        alignment,
        anchor,
        rotation,
      },

      labelZeroConfig: {
        alignment: zAlignment,
        anchor: zAnchor,
        rotation: zRotation,
      },
    };
  }, [
    alignment,
    anchor,
    changeConfig,
    rotation,
    showLabels,
    unitSize,
    x,
    y,
    zAlignment,
    zAnchor,
    zRotation,
    zx,
    zy,
  ]);

  return (
    <div
      style={{
        border: "1px solid red",
        position: "relative",
        width: "70vw",
        minHeight: "50vh",
        margin: "0 auto",
      }}
    >
      <div
        className="controls"
        style={{
          padding: "1rem 0",
        }}
      >
        <h2>Ruler example</h2>
        <h3>Controls</h3>
        <div className="control-group">
          <button onClick={setDefaults}>Reset</button>
        </div>
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
          <label>Location:</label>
          <div>
            {(["top", "right", "bottom", "left"] as TLocation[]).map(
              (value, index) => (
                <label key={`${index}-${value}`}>
                  <input
                    type="radio"
                    value={value}
                    checked={location === value}
                    onChange={(e) => setLocation(e.target.value as TLocation)}
                  />
                  {value}
                </label>
              )
            )}
          </div>
        </div>

        {/* size */}
        <div className="control-group">
          <label>
            Ruler size:
            <input
              type="number"
              min="0"
              max="150"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
          </label>
        </div>
        {/* subdivisions */}
        <div className="control-group">
          <label>
            Ruler subdivisions:
            <input
              type="number"
              min="0"
              max="25"
              value={subdivisions}
              onChange={(e) => setSubdivisions(Number(e.target.value))}
            />
          </label>
        </div>
        {/* width */}
        <div className="control-group">
          <label>
            Ruler width {!overrideWidth && `(also main tick width)`}:
            <input
              type="number"
              min="0"
              max="100"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={overrideWidth}
              onChange={(e) => setOverrideWidth(e.target.checked)}
            />
            Override main tick width
          </label>
        </div>
        {overrideWidth && (
          <div className="control-group">
            <label>
              Main tick width:
              <input
                type="number"
                min="0"
                max="100"
                value={mainTickWidth}
                onChange={(e) => setMainTickWidth(Number(e.target.value))}
              />
            </label>
          </div>
        )}
        {/* edge */}
        <div className="control-group">
          <label>
            Ruler edge width:
            <input
              type="number"
              min="0"
              value={edge}
              onChange={(e) => setEdge(Number(e.target.value))}
            />
          </label>
        </div>
        {/* tickWidth */}
        <div className="control-group">
          <label>
            Ruler tick width:
            <input
              type="number"
              min="0"
              value={tickWidth}
              onChange={(e) => setTickWidth(Number(e.target.value))}
            />
          </label>
        </div>
        {/* showHalfTick */}
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={showHalfTick}
              onChange={(e) => setShowHalfTick(e.target.checked)}
            />
            Show half-tick
          </label>
        </div>
        {/* halfTickWidth */}
        {showHalfTick && (
          <div className="control-group">
            <label>
              Ruler half-tick width:
              <input
                type="number"
                min="0"
                value={halfTickWidth}
                onChange={(e) => setHalfTickWidth(Number(e.target.value))}
              />
            </label>
          </div>
        )}

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={skipZero}
              onChange={(e) => setSkipZero(e.target.checked)}
            />
            Skip zero
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

        {showLabels && (
          <div
            style={{
              padding: "1rem 0",
            }}
          >
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
                    Units size:
                    <input
                      type="number"
                      min="0"
                      max="150"
                      value={unitSize}
                      onChange={(e) => setUnitSize(Number(e.target.value))}
                    />
                  </label>
                </div>
                <div className="control-group">
                  <label>
                    Label offset: tick distance (x)
                    <input
                      type="number"
                      min="-50"
                      max="50"
                      value={x}
                      onChange={(e) => setXOffset(Number(e.target.value))}
                    />
                    , edge distance (y)
                    <input
                      type="number"
                      min="-50"
                      max="50"
                      value={y}
                      onChange={(e) => setYOffset(Number(e.target.value))}
                    />
                  </label>
                </div>
                <div className="control-group">
                  <label>
                    Zero label offset: x
                    <input
                      type="number"
                      min="-50"
                      max="50"
                      value={zx}
                      onChange={(e) => setZXOffset(Number(e.target.value))}
                    />
                    , y
                    <input
                      type="number"
                      min="-50"
                      max="50"
                      value={zy}
                      onChange={(e) => setZYOffset(Number(e.target.value))}
                    />
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ padding: "0.25rem 1rem" }}>
                    <h5>labelConfig</h5>
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
                                | "central"
                                | "text-after-edge"
                            )
                          }
                        >
                          {(
                            [
                              "text-before-edge",
                              "middle",
                              "central",
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
                            setAnchor(
                              e.target.value as "start" | "middle" | "end"
                            )
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
                  </div>
                  <div style={{ padding: "0.25rem 1rem" }}>
                    <h5>labelZeroConfig</h5>
                    <div className="control-group">
                      <label>
                        Alignment:
                        <select
                          value={zAlignment}
                          onChange={(e) =>
                            setZAlignment(
                              e.target.value as
                                | "text-before-edge"
                                | "middle"
                                | "central"
                                | "text-after-edge"
                            )
                          }
                        >
                          {(
                            [
                              "text-before-edge",
                              "middle",
                              "central",
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
                          value={zAnchor}
                          onChange={(e) =>
                            setZAnchor(
                              e.target.value as "start" | "middle" | "end"
                            )
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
                        Rotation: {zRotation}
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          step="45"
                          value={zRotation}
                          onChange={(e) => setZRotation(Number(e.target.value))}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 

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




 */}
      </div>

      <Ruler
        debug={debug}
        labels={config}
        position={position}
        location={location}
        size={size}
        subdivisions={subdivisions}
        width={width}
        edge={edge}
        tickWidth={tickWidth}
        showHalfTick={showHalfTick}
        halfTickWidth={halfTickWidth}
        skipZero={skipZero}
        mainTickWidth={overrideWidth ? mainTickWidth : undefined}
      />
      {/* <Ruler
        debug={debug}
        labels={config}
        position={position}
        location={getOppositeLocation(location)}
        size={size}
        subdivisions={subdivisions}
        width={width}
        edge={edge}
        tickWidth={tickWidth}
        showHalfTick={showHalfTick}
        halfTickWidth={halfTickWidth}
        skipZero={skipZero}
      /> */}
    </div>
  );
};

// const getOppositeLocation = (location: TLocation): TLocation => {
//   if (location === "bottom") return "top";
//   if (location === "top") return "bottom";
//   if (location === "left") return "right";
//   return "left";
// };
