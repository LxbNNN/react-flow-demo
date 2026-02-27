import { type Node } from "@xyflow/react";


/**
 * 源节点数据类型
 * T 代表 data 属性中的自定义数据类型
 */
export type SourceNodeData<
  T extends Record<string, unknown> = Record<string, unknown>
> = Node<T>;
