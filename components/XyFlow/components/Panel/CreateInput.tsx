import { Panel, useNodes } from "@xyflow/react";
import { useRef } from "react";
import NodeType from "../../Nodes/lib/NodeType";

const CreateInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const nodes = useNodes();
  const focusedNode = nodes.find((node) => node.selected);
  const isTextToImageNode = focusedNode?.type === NodeType.TextToImageNode;

  if (!isTextToImageNode) return null;

  const MAX_HEIGHT = 256;

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  };

  return (
    <Panel position="bottom-center">
      <div className="w-screen max-w-[900px] bg-black rounded-xl p-4">
        <textarea
          ref={textareaRef}
          rows={1}
          onInput={handleInput}
          placeholder="输入内容..."
          className="w-full resize-none bg-transparent text-white placeholder-gray-500 outline-none leading-6 max-h-64 overflow-y-auto"
        />
      </div>
    </Panel>
  );
};

export default CreateInput;
