import Image from "next/image";
import { Handle, Position, NodeProps } from "@xyflow/react";

const TextToImageNode = (props: NodeProps) => {
  const { id, data } = props;

  return (
    <div className="w-100  bg-black rounded-lg shadow-md p-4">
      <div className="text-white text-sm w-full text-center text-lg">
        文生图类型
      </div>
      <div className="w-full aspect-square relative">
        <Image src="/images/text-to-image.jpg" alt="TextToImage" fill />
      </div>

      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
};

export default TextToImageNode;
