import "./RulerExample.scss";
import { useCallback, useEffect, useState } from "react";
import { Ruler } from "../../lib";
import type { TPosition } from "../../lib/types/common";
import type {
  TLocation,
  TUnit,
  IProps as IRulerProps,
} from "../../lib/ruler/types";
import { Example } from "./Example";
import { Debug } from "./controls/Debug";
import { RadioOptions } from "./controls/RadioOptions";
import { Numeric } from "./controls/Numeric";
import { Checkbox } from "./controls/Checkbox";
import { useFormContext } from "react-hook-form";
import { cloneDeep } from "lodash";
import { UnitPropsControls } from "./controls/UnitPropsControls";

type TRulerControlsData = {
  debug: boolean;
  position: TPosition;
  location: TLocation;
  size: number;
  subdivisions: number;
  overrideWidth: boolean;
  width: number;
  mainTickWidth?: number;
  edge: number;
  tickWidth: number;
  showHalfTick: boolean;
  halfTickWidth: number;
  showLabels: boolean;
  skipZero: boolean;
  labels?: boolean | TUnit;
  changeConfig: boolean;
};

const defaultValues: TRulerControlsData = {
  debug: false,
  location: "left",
  position: "absolute",
  size: 100,
  subdivisions: 10,
  overrideWidth: false,
  width: 25,
  mainTickWidth: undefined,
  edge: 3,
  tickWidth: 10,
  showHalfTick: true,
  showLabels: false,
  skipZero: false,
  halfTickWidth: 20,
  changeConfig: false,
};

const defaultUnitValues: TUnit = {
  offset: { x: 2, y: 12 },
  size: 100,
  zero: { x: 2, y: 12 },
  labelConfig: {
    alignment: "text-before-edge",
    anchor: "start",
    rotation: 0,
  },
  labelZeroConfig: {
    alignment: "text-before-edge",
    anchor: "start",
    rotation: 0,
  },
};

export const RulerExample = () => {
  const [controlsData, setControlsData] = useState<IRulerProps>(defaultValues);
  const onControlsDataChanged = useCallback((data: IRulerProps) => {
    setControlsData(data);
  }, []);

  return (
    <>
      <Example<TRulerControlsData>
        defaultValues={defaultValues}
        className="RulerExample"
        title="Ruler example"
        controls={<RulerControls onChange={onControlsDataChanged} />}
      >
        <Ruler {...controlsData} />
      </Example>
    </>
  );
};

// const getOppositeLocation = (location: TLocation): TLocation => {
//   if (location === "bottom") return "top";
//   if (location === "top") return "bottom";
//   if (location === "left") return "right";
//   return "left";
// };
function RulerControls({
  onChange,
}: {
  onChange: (data: IRulerProps) => void;
}) {
  const methods = useFormContext<TRulerControlsData>();

  useEffect(() => {
    // make sure to unsubscribe;
    const callback = methods.subscribe({
      formState: {
        values: true,
      },
      callback: ({ values, name }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { showLabels, overrideWidth, changeConfig, ...props } = values;
        if (name === "showLabels") {
          if (!showLabels) {
            props.labels = undefined;
            props.skipZero = false;
            methods.setValue("labels", undefined);
            methods.setValue("skipZero", false);
            methods.setValue("changeConfig", false);
          } else {
            props.labels = true;
            methods.setValue("labels", true);
          }
        }
        if (name === "changeConfig") {
          if (changeConfig) {
            // apply defaults
            props.labels = cloneDeep(defaultUnitValues);
            methods.setValue("labels", cloneDeep(defaultUnitValues));
          } else {
            props.labels = true;
            methods.setValue("labels", true);
          }
        }

        onChange?.(props);
      },
    });

    return () => callback();

    // You can also just return the subscribe
    // return subscribe();
  }, [methods, onChange]);

  return (
    <>
      <Debug />
      <RadioOptions<TRulerControlsData>
        label="Position"
        name="position"
        options={[{ value: "absolute" }, { value: "fixed" }]}
      />
      <RadioOptions<TRulerControlsData>
        label="Locatio"
        name="location"
        options={[
          { value: "top" },
          { value: "left" },
          { value: "right" },
          { value: "bottom" },
        ]}
      />
      <Numeric<TRulerControlsData>
        name="size"
        label="Size of the main division."
      />
      <Numeric<TRulerControlsData>
        name="subdivisions"
        label="Number of subdivisions."
      />
      {/* width */}
      <Numeric<TRulerControlsData>
        name="width"
        label={`Ruler width ${
          !methods.getValues("overrideWidth") && "(also main tick width)"
        }`}
      />
      <Checkbox<TRulerControlsData>
        label="Override main tick width"
        name="overrideWidth"
      />
      {methods.getValues("overrideWidth") && (
        <Numeric<TRulerControlsData>
          name="mainTickWidth"
          label={"Main tick width"}
        />
      )}
      {/* edge */}
      <Numeric<TRulerControlsData> name="edge" label={"Ruler edge width"} />
      {/* tickWidth */}
      <Numeric<TRulerControlsData>
        name="tickWidth"
        label={"Ruler tick width"}
      />
      {/* showHalfTick */}

      <Checkbox<TRulerControlsData>
        label="Show half-tick"
        name="showHalfTick"
      />
      {/* halfTickWidth */}
      {methods.getValues("showHalfTick") && (
        <Numeric<TRulerControlsData>
          name="halfTickWidth"
          label={"Ruler tick width"}
        />
      )}

      <Checkbox<TRulerControlsData> label="Show labels" name="showLabels" />
      {methods.getValues("showLabels") && (
        <>
          <Checkbox<TRulerControlsData>
            label="Skip Zero label"
            name="skipZero"
          />
          <div className="control-group">
            <h4>Label config</h4>
            <Checkbox<TRulerControlsData>
              label="Edit config"
              name="changeConfig"
            />
            {methods.getValues("changeConfig") && (
              <UnitPropsControls<TRulerControlsData> name="labels" />
            )}
          </div>
        </>
      )}
    </>
  );
}
