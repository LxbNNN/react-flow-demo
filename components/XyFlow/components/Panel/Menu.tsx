import { RefObject, useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { useDraggable } from "@neodrag/react";
import { Panel, useReactFlow, XYPosition } from "@xyflow/react";
import { Button } from "@/components/ui";
import { NodeType } from "@/type/enum/NodeEnum";

let id = 0;
const getId = () => `dndnode_${id++}`;

interface DraggableNodeProps {
  className?: string;
  children: React.ReactNode;
  nodeType: string;
  onDrop: (nodeType: string, position: XYPosition) => void;
}

function DraggableNode({
  className,
  children,
  nodeType,
  onDrop,
}: DraggableNodeProps) {
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<XYPosition>({ x: 0, y: 0 });

  useDraggable(draggableRef as RefObject<HTMLElement>, {
    position: position,
    onDrag: ({ offsetX, offsetY }) => {
      // Calculate position relative to the viewport
      setPosition({
        x: offsetX,
        y: offsetY,
      });
    },
    onDragEnd: ({ event }) => {
      setPosition({ x: 0, y: 0 });
      onDrop(nodeType, {
        x: event.clientX,
        y: event.clientY,
      });
    },
  });

  return (
    <div className={clsx("dndnode", className)} ref={draggableRef}>
      {children}
    </div>
  );
}

const MenuPanel = () => {
  const { setNodes, screenToFlowPosition, getNodes } = useReactFlow();

  const addTextToImageNode = (type: NodeType) => {
    const newNode = {
      id: getId(),
      type,
      position: { x: 100, y: 100 },
      data: { value: 123 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleNodeDrop = useCallback(
    (nodeType: string, screenPosition: XYPosition) => {
      const flow = document.querySelector(".react-flow");
      const flowRect = flow?.getBoundingClientRect();
      const isInFlow =
        flowRect &&
        screenPosition.x >= flowRect.left &&
        screenPosition.x <= flowRect.right &&
        screenPosition.y >= flowRect.top &&
        screenPosition.y <= flowRect.bottom;

      // Create a new node and add it to the flow
      if (isInFlow) {
        const position = screenToFlowPosition(screenPosition);

        const newNode = {
          id: getId(),
          type: nodeType,
          position,
          data: { label: `${nodeType} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [setNodes, screenToFlowPosition]
  );

  return (
    <Panel position="top-left" className="h-[calc(100%-30px)]">
      <div className="w-64 h-full bg-black rounded-xl p-4">
        <h1 className="text-white text-lg font-bold">Menu</h1>

        <div>
          <DraggableNode
            nodeType={NodeType.TextToImageNode}
            onDrop={handleNodeDrop}
          >
            <Button
              className="cursor-pointer"
              onClick={() => addTextToImageNode(NodeType.TextToImageNode)}
            >
              添加文生图组件
            </Button>
          </DraggableNode>
        </div>
      </div>
    </Panel>
  );
};

export default MenuPanel;
