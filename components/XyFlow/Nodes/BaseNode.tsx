import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { SourceNodeData } from "@/type/common";

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

const BaseNode = () => {
  const connections = useNodeConnections({ handleType: "target" });
  const nodesData = useNodesData<SourceNodeData<{ value: ColorRGB }>>(
    connections?.[0]?.source
  );

  const color = nodesData?.data?.value ?? { r: 0, g: 0, b: 0 };

  return (
    <div className="w-[150] h-[150] rounded-lg  bg-amber-300 border-black flex flex-col  justify-around">
      <div>
        BaseNode输出: {color.r}, {color.g}, {color.b}
      </div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default BaseNode;
