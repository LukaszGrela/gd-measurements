import { useState, type SVGAttributes } from "react";
import { Label } from "../../lib/labels/Label";

export const LabelExample = () => {
  const [debug, setDebug] = useState(true);
  const [label, setLabel] = useState("Label");
  const [rotation, setRotation] = useState(0);
  const [anchor, setAnchor] = useState<"start" | "middle" | "end">("start");

  const [alignment, setAlignment] = useState<
    "text-before-edge" | "middle" | "text-after-edge"
  >("text-before-edge");

  return (
    <div>
      <div className="controls">
        <h2> Label example</h2>
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
                ["text-before-edge", "middle", "text-after-edge"] as Exclude<
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
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(String(e.target.value))}
            />
          </label>
        </div>
      </div>

      <svg width={600} height={600}>
        {/*}
          <g>
            {(
              ["text-before-edge", "middle", "text-after-edge"] as Exclude<
                SVGAttributes<SVGTSpanElement>["alignmentBaseline"],
                undefined
              >[]
            ).map((alignment, index) => (
              <Label
                key={alignment}
                translate={{ x: 10, y: 40 + index * 45 }}
                alignment={alignment}
              >
                {alignment.toUpperCase()}
              </Label>
            ))}
          </g>
          <g>
            {(["start", "middle", "end"] as const).map((anchor, index) => (
              <Label
                key={anchor}
                translate={{ x: 200, y: 40 + index * 45 }}
                anchor={anchor}
              >
                {anchor.toUpperCase()}
              </Label>
            ))}
          </g>
          */}
        <g>
          <Label
            key={0}
            alignment={alignment}
            anchor={anchor}
            translate={{ x: 300, y: 200 }}
            rotation={rotation}
            debug={debug}
          >
            {label}
          </Label>
        </g>
      </svg>
    </div>
  );
};
