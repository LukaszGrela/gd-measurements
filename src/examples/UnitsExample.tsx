import { useCallback, useMemo, useRef, useState } from "react";
import { Units, type IProps } from "../../lib/labels/Units";
import { Example } from "./Example";
import { Debug } from "./controls/Debug";
import { Point } from "./controls/Point";
import type { TPoint } from "../../lib/types/common";
import { Checkbox } from "./controls/Checkbox";
import { RadioOptions } from "./controls/RadioOptions";
import { Numeric } from "./controls/Numeric";
import { Rotation } from "./controls/Rotation";
import { Alignment } from "./controls/Alignment";
import { Anchor } from "./controls/Anchor";

type TUnitsControlsData = {
  debug: boolean;
  translate: TPoint;
  offset: TPoint;
  orientation: "horizontal" | "vertical";
  size: number;

  zero?: TPoint;
  changeConfig?: boolean;

  rotation?: number;
  anchor?: "start" | "middle" | "end";
  alignment?: "text-before-edge" | "middle" | "text-after-edge";
  // label?: string;
};

const defaultValues: TUnitsControlsData = {
  debug: false,
  translate: { x: 20, y: 20 },
  offset: { x: 0, y: 0 },
  zero: { x: 0, y: 0 },
  orientation: "horizontal",
  size: 100,
  changeConfig: false,
  rotation: 0,
  anchor: "start",
  alignment: "text-before-edge",
  // label: "Label",
};

export const UnitsExample = () => {
  const ref = useRef<SVGSVGElement | null>(null);

  const [controlsData, setControlsData] =
    useState<TUnitsControlsData>(defaultValues);
  const onControlsDataChanged = useCallback((data: TUnitsControlsData) => {
    setControlsData(data);
  }, []);

  const config = useMemo((): IProps["labelConfig"] => {
    if (!controlsData.changeConfig) return undefined;

    return {
      alignment: controlsData.alignment,
      anchor: controlsData.anchor,
      rotation: controlsData.rotation,
    };
  }, [
    controlsData.alignment,
    controlsData.anchor,
    controlsData.changeConfig,
    controlsData.rotation,
  ]);

  return (
    <>
      <Example<TUnitsControlsData>
        onChange={onControlsDataChanged}
        defaultValues={defaultValues}
        className="UnitsExample"
        title="Units example"
        controls={
          <>
            <Debug />
            <RadioOptions<TUnitsControlsData>
              label="Orientation"
              name="orientation"
              options={[{ value: "horizontal" }, { value: "vertical" }]}
            />
            <Numeric<TUnitsControlsData>
              name="size"
              label="Size of labels step"
            />
            <Point<TUnitsControlsData> name="translate" label="Translate" />
            <h4>Label config</h4>
            <Checkbox label="Edit label config" name="changeConfig" />
            {controlsData.changeConfig && (
              <>
                <Point<TUnitsControlsData>
                  name="offset"
                  label="Offset of labels"
                />
                <Rotation />
                <Alignment />
                <Anchor />
                <h5>Zero label</h5>
                <Point<TUnitsControlsData>
                  name="zero"
                  label="Offset of zero label"
                />
              </>
            )}
          </>
        }
      >
        <svg className="container" ref={ref} width={600} height={600}>
          <Units
            svgRef={ref}
            orientation={controlsData.orientation}
            size={controlsData.size}
            translate={controlsData.translate}
            labelConfig={config}
            labelZeroConfig={config}
            debug={controlsData.debug}
            offset={controlsData.changeConfig ? controlsData.offset : undefined}
            zero={controlsData.changeConfig ? controlsData.zero : undefined}
          />
        </svg>
      </Example>
    </>
  );
};
