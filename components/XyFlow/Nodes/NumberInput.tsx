import { useCallback, useState } from "react";
import { Handle, Position, NodeProps, useReactFlow } from "@xyflow/react";

interface NumberInputProps extends NodeProps {
  data: {
    label: string;
    value: number;
  };
}

function NumberInput({ id, data }: NumberInputProps) {
  const { updateNodeData } = useReactFlow();
  const [number, setNumber] = useState(data?.value);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const cappedNumber = Math.round(
      Math.min(255, Math.max(0, Number(evt.target.value)))
    );
    setNumber(cappedNumber);
    updateNodeData(id, { value: cappedNumber });
  };

  return (
    <div className="p-4 rounded-lg bg-white border-2 border-black">
      <div>{data?.label as string}</div>
      <input
        id={`number-${id}`}
        name="number"
        type="number"
        min="0"
        max="255"
        onChange={onChange}
        className="border-1  rounded-sm"
        value={number}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default NumberInput;
