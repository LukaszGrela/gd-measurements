import "./LabelExample.scss";
import { useCallback, useState } from "react";
import { Label } from "../../lib/labels/Label";
import { Example } from "./Example";
import { Debug } from "./controls/Debug";
import { Rotation } from "./controls/Rotation";
import { Alignment } from "./controls/Alignment";
import { Anchor } from "./controls/Anchor";
import { Text } from "./controls/Text";

type TLabelControlsData = {
  debug: boolean;
  rotation?: number;
  anchor?: "start" | "middle" | "end";
  alignment?: "text-before-edge" | "middle" | "text-after-edge";
  label?: string;
};

const defaultValues: TLabelControlsData = {
  debug: false,
  rotation: 0,
  anchor: "start",
  alignment: "text-before-edge",
  label: "Label",
};

export const LabelExample = () => {
  const [controlsData, setControlsData] =
    useState<TLabelControlsData>(defaultValues);
  const onControlsDataChanged = useCallback((data: TLabelControlsData) => {
    console.log(data);
    setControlsData(data);
  }, []);
  return (
    <>
      <Example<TLabelControlsData>
        onChange={onControlsDataChanged}
        defaultValues={defaultValues}
        className="LabelExample"
        title="Label example"
        controls={
          <>
            <Debug />
            <Rotation />
            <Alignment />
            <Anchor />
            <Text<TLabelControlsData> name="label" />
          </>
        }
      >
        <svg width={"100%"} height={"300px"}>
          <g>
            <Label key={0} translate={{ x: 300, y: 150 }} {...controlsData}>
              {controlsData.label}
            </Label>
          </g>
        </svg>
      </Example>
    </>
  );
};
