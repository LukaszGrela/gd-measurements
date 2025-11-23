import { useMemo, useRef, useState, type SVGAttributes } from "react";
import { Units, type IProps } from "../../lib/labels/Units";

export const UnitsExample = () => {
  const [debug, setDebug] = useState(true);
  const [changeConfig, setChangeConfig] = useState(false);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );

  const [x, setXOffset] = useState(0);
  const [y, setYOffset] = useState(0);

  const [rotation, setRotation] = useState(0);
  const [anchor, setAnchor] = useState<"start" | "middle" | "end">("start");

  const [alignment, setAlignment] = useState<
    "text-before-edge" | "middle" | "text-after-edge"
  >("text-before-edge");

  const ref = useRef<SVGSVGElement | null>(null);

  const config = useMemo((): IProps["labelConfig"] => {
    if (!changeConfig) return undefined;

    return {
      alignment,
      anchor,
      rotation,
    };
  }, [alignment, anchor, changeConfig, rotation]);
  
  return (
    <div>
      <div className="controls">
        <h2>Units example</h2>
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
            Orientation {orientation}:
            <select
              value={orientation}
              onChange={(e) =>
                setOrientation(e.target.value as "horizontal" | "vertical")
              }
            >
              {["horizontal", "vertical"].map((value, index) => (
                <option key={`${index}-${value}`} value={value}>
                  {value}
                </option>
              ))}
            </select>
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
                Offset: x
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={x}
                  onChange={(e) => setXOffset(Number(e.target.value))}
                />
                , y
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={y}
                  onChange={(e) => setYOffset(Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      <svg ref={ref} width={600} height={600}>
        <Units
          svgRef={ref}
          orientation={orientation}
          size={100}
          debug={debug}
          translate={{ x: 30, y: 30 }}
          labelConfig={config}
          labelZeroConfig={config}
          offset={changeConfig ? { x, y } : undefined}
          zero={changeConfig ? { x, y } : undefined}
        />
      </svg>
    </div>
  );
};
