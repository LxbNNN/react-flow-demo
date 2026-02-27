import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
  type Node,
  useReactFlow,
} from "@xyflow/react";
import { useEffect } from "react";
import { SourceNodeData } from "@/type/common";

const handleClassName = "relative! top-[17px]!";
const labelClassName = "text-white text-sm p-2";

const ColorPreviewHandle = ({
  id,
  onChange,
  label,
}: {
  id: string;
  onChange: (value: number) => void;
  label: string;
}) => {
  const connections = useNodeConnections({
    handleType: "target",
    handleId: id,
  });

  const nodeData = useNodesData<SourceNodeData<{ value: number }>>(
    connections?.[0]?.source
  );

  useEffect(() => {
    onChange(nodeData?.data ? nodeData.data.value : 0);
  }, [nodeData]);

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        className={handleClassName}
      />
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    </div>
  );
};

export default ColorPreviewHandle;
