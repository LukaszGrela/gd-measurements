import "./GridExample.scss";
import { useCallback, useEffect, useState } from "react";
import { Grid } from "../../lib";
import type { TUnits, IProps as IGridProps } from "../../lib/grid/types";
import { Example } from "./Example";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { cloneDeep } from "lodash";
import { Debug } from "./controls/Debug";
import { RadioOptions } from "./controls/RadioOptions";
import { Numeric } from "./controls/Numeric";
import { Checkbox } from "./controls/Checkbox";
import { Point } from "./controls/Point";
import { Size } from "./controls/Size";
import { LabelPropsControls } from "./controls/LabelPropsControls";

type TGridControlsData = IGridProps & {
  showLabels: boolean;
  changeConfig: boolean;
};
const defaultValues: TGridControlsData = {
  debug: false,
  grid: {
    height: 50,
    width: 50,
    subdivision: 5,
  },
  labels: undefined,
  position: "absolute",
  changeConfig: false,
  showLabels: false,
};

const defaultUnitsValues: TUnits = {
  hOffset: { x: 2, y: 0 },
  vOffset: { x: 0, y: -2 },
  zero: { x: 12, y: 0 },
  size: { height: 50, width: 50 },
};

export const GridExample = () => {
  const [controlsData, setControlsData] = useState<IGridProps>(defaultValues);
  const onControlsDataChanged = useCallback((data: IGridProps) => {
    setControlsData(data);
  }, []);

  return (
    <>
      <Example<TGridControlsData>
        defaultValues={defaultValues}
        className="GridExample"
        title="Grid example"
        controls={<GridControls onChange={onControlsDataChanged} />}
      >
        <Grid {...controlsData} />
      </Example>
    </>
  );
};
function GridControls({ onChange }: { onChange: (data: IGridProps) => void }) {
  const methods = useFormContext<TGridControlsData>();

  useEffect(() => {
    // make sure to unsubscribe;
    const callback = methods.subscribe({
      formState: {
        values: true,
      },
      callback: ({ values, name }) => {
        const { showLabels, changeConfig, ...props } = values;
        if (name === "showLabels") {
          if (!showLabels) {
            props.labels = undefined;
            methods.setValue("labels", undefined);
            methods.setValue("changeConfig", false);
          } else {
            props.labels = true;
            methods.setValue("labels", true);
          }
        }
        if (name === "changeConfig") {
          if (changeConfig) {
            // apply defaults
            props.labels = cloneDeep(defaultUnitsValues);
            methods.setValue("labels", cloneDeep(defaultUnitsValues));
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
      <RadioOptions<TGridControlsData>
        label="Position"
        name="position"
        options={[{ value: "absolute" }, { value: "fixed" }]}
      />
      {/* grid subdivision */}
      <Numeric<TGridControlsData>
        name="grid.subdivision"
        label="Subdivision of the Grid box"
      />
      {/* size */}
      <Size<TGridControlsData> name="grid" label="Grid" />

      <Checkbox<TGridControlsData> label="Show labels" name="showLabels" />
      {methods.getValues("showLabels") && (
        <>
          <div className="control-group">
            <h4>Labels config</h4>
            <Checkbox<TGridControlsData>
              label="Edit config"
              name="changeConfig"
            />
            {methods.getValues("changeConfig") && (
              <UnitsPropsControls<TGridControlsData> name="labels" />
            )}
          </div>
        </>
      )}
    </>
  );
}

function UnitsPropsControls<FormData extends FieldValues>({
  name,
}: {
  name: Path<FormData>;
}) {
  return (
    <>
      {/* TUnit */}
      <Point name={`${name}.hOffset`} label="Offset of horizontal labels" />
      <Point name={`${name}.vOffset`} label="Offset of vertical labels" />
      <Point name={`${name}.zero`} label="Offset of zero label" />
      <Size name={`${name}.size`} label="Size of the label step" />
      <div className="flex-row">
        <LabelPropsControls
          label="Vertical label config"
          name={`${name}.vLabelConfig`}
        />
        <LabelPropsControls
          label="Horizontal label config"
          name={`${name}.hLabelConfig`}
        />
      </div>
      <LabelPropsControls
        label="labelZeroConfig"
        name={`${name}.labelZeroConfig`}
      />
    </>
  );
}
