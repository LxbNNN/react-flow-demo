"use client";
import { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  Connection,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import GlobalStore from "@/store/GlobalStore";
import { PanelBase, BaseNode } from "./components";
import { nodeTypes } from "./Nodes";
import { edgeTypes } from "./Edges";

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    GlobalStore.getState().nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    GlobalStore.getState().edges
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges(addEdge({ ...params, type: "customEdge" }, edges));
      console.log("?????onConnect", params, edges);
    },
    [edges, setEdges]
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        // colorMode="dark"
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <BaseNode />
        <PanelBase />
      </ReactFlow>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
