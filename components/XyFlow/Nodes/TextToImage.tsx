import Image from "next/image";
import { Handle, Position, NodeProps, NodeToolbar } from "@xyflow/react";

const TextToImageNode = (props: NodeProps) => {
  const { id, data } = props;

  return (
    <>
      <NodeToolbar position={Position.Top} align="center">
        <div className="bg-black text-white flex items-center justify-center gap-3 px-4 py-2 h-9 rounded-md border ">
          <div className="cursor-pointer">◯</div>
          <div className="cursor-pointer">▶</div>
          <div className="cursor-pointer">↓</div>
        </div>
      </NodeToolbar>

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
    </>
  );
};

export default TextToImageNode;
