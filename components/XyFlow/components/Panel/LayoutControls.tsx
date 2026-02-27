import { useCallback } from "react";
import {
  Panel,
  useReactFlow,
  useStoreApi,
  useStore,
  type ReactFlowState,
} from "@xyflow/react";
import GlobalStore from "@/store/GlobalStore";
import { getLayoutedElements } from "../../lib/utils/layout";
import { Button } from "@/components/ui";

const transformSelector = (state: ReactFlowState) => state.transform;
function LayoutControls() {
  const store = useStoreApi();
  const transform = useStore(transformSelector);
  const { fitView, zoomIn, zoomOut, setCenter } = useReactFlow();
  const setNodes = GlobalStore((state) => state.setNodes);
  const nodes = GlobalStore((state) => state.nodes);
  const setEdges = GlobalStore((state) => state.setEdges);
  const edges = GlobalStore((state) => state.edges);

  const onLayout = useCallback(
    (direction: "TB" | "LR") => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      fitView();
    },
    [nodes, edges, setNodes, setEdges, fitView]
  );

  const focusNode = () => {
    const { nodeLookup } = store.getState();
    const nodes = Array.from(nodeLookup).map(([, node]) => node);

    if (nodes.length > 0) {
      const node = nodes[0];

      const x = node.position.x + (node.measured?.width ?? 0) / 2;
      const y = node.position.y + (node.measured?.height ?? 0) / 2;
      const zoom = 1.85;

      setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  const handleZoomIn = () => {
    zoomIn();
  };

  const handleZoomOut = () => {
    zoomOut();
  };

  return (
    <Panel position="top-right">
      <div className="flex  gap-2">
        <div className="transform">
          坐标： [{transform[0].toFixed(2)}, {transform[1].toFixed(2)},
          {transform[2].toFixed(2)}]<div className="title">Nodes</div>
          {nodes.map((node) => (
            <div key={node.id}>
              Node {node.id} - x: {node.position.x.toFixed(2)}, y:{" "}
              {node.position.y.toFixed(2)}
            </div>
          ))}
        </div>

        <div className="flex  gap-2">
          <Button onClick={() => onLayout("TB")}>vertical layout</Button>
          <Button onClick={() => onLayout("LR")}>horizontal layout</Button>
          <Button className="xy-theme__button" onClick={focusNode}>
            focus node
          </Button>
          <Button className="xy-theme__button" onClick={handleZoomIn}>
            zoom in
          </Button>
          <Button className="xy-theme__button" onClick={handleZoomOut}>
            zoom out
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default LayoutControls;
