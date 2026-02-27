import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import { ColorPreviewHandle } from "../Handles";

function ColorPreview() {
  const { updateNodeData } = useReactFlow();
  const [color, setColor] = useState({
    r: 0,
    g: 0,
    b: 0,
  });

  useEffect(() => {
    updateNodeData("color", { value: color });
  }, [color]);

  return (
    <div
      className="w-[150] h-[150] rounded-lg  border-black flex flex-col  justify-around"
      style={{
        background: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    >
      <div>
        <ColorPreviewHandle
          id="red"
          onChange={(value) => {
            setColor((initial) => {
              const info = { ...initial, r: value };

              return info;
            });
          }}
          label="R"
        />
      </div>
      <div>
        <ColorPreviewHandle
          id="green"
          onChange={(value) => {
            setColor((initial) => {
              const info = { ...initial, g: value };

              return info;
            });
          }}
          label="G"
        />
      </div>
      <div>
        <ColorPreviewHandle
          id="blue"
          onChange={(value) => {
            setColor((initial) => {
              const info = { ...initial, b: value };
              return info;
            });
          }}
          label="B"
        />
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default ColorPreview;
