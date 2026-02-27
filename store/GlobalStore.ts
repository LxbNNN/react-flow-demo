import { create } from "zustand";
import { Node, Edge } from "@xyflow/react";

// export interface GlobalStoreEventType {
//   setEdges: (edges: Edge[]) => void;
//   addEdges: (edges: Edge[]) => void;
//   setNodes: (nodes: Node[]) => void;
//   addNodes: (nodes: Node[]) => void;
// }

export interface GlobalStoreType {
  nodes: Node[];
  edges: Edge[];
}

const GlobalStore = create<GlobalStoreType>((set, get) => ({
  nodes: [
    {
      id: "1",
      type: "numberInput",
      position: { x: 0, y: 0 },
      data: { label: "Red", value: 255 },
    },
    {
      id: "2",
      type: "numberInput",
      position: { x: 0, y: 100 },
      data: { label: "Blue", value: 55 },
    },
    {
      id: "3",
      type: "numberInput",
      position: { x: 0, y: 200 },
      data: { label: "Green", value: 0 },
    },
    {
      id: "color",
      type: "colorPreview",
      position: { x: 200, y: 100 },
      data: {},
    },
    {
      id: "baseNode1",
      type: "baseNode",
      position: { x: 400, y: 100 },
      data: {},
    },
  ],
  // setNodes: (nodes: Node[]) => set({ nodes }),
  // addNodes: (nodes: Node[]) =>
  //   set((state) => ({ nodes: [...state.nodes, ...nodes] })),

  edges: [
    {
      id: "1-color",
      source: "1",
      target: "color",
      targetHandle: "red",
      type: "customEdge",
    },
    {
      id: "2-color",
      source: "2",
      target: "color",
      targetHandle: "green",
      type: "customEdge",
    },
    {
      id: "3-color",
      source: "3",
      target: "color",
      targetHandle: "blue",
      type: "customEdge",
    },
    {
      id: "baseNode1-color",
      source: "color",
      target: "baseNode1",
    },
  ],
  // setEdges: (edges: Edge[]) => set({ edges }),
  // addEdges: (edges: Edge[]) =>
  //   set((state) => ({ edges: [...state.edges, ...edges] })),
}));

export default GlobalStore;
