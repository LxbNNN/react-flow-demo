import Dagre from "@dagrejs/dagre";
import { Node, Edge } from "@xyflow/react";

interface LayoutOptions {
  direction: "TB" | "LR";
}

interface LayoutedElements {
  nodes: Node[];
  edges: Edge[];
}

/**
 * 使用 Dagre 算法对节点和边进行布局
 * @param nodes - React Flow 节点数组
 * @param edges - React Flow 边数组
 * @param options - 布局选项，包含方向（TB: 垂直, LR: 水平）
 * @returns 布局后的节点和边
 */
export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions
): LayoutedElements {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
}
