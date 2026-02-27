import {
  BaseEdge,
  EdgeProps,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const { deleteElements } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  // 计算线条的角度
  const angle =
    Math.atan2(targetY - sourceY, targetX - sourceX) * (180 / Math.PI);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      {/* <EdgeLabelRenderer>
        <Button
          className="nodrag nopan pointer-events-auto absolute"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
          onClick={() => deleteElements({ edges: [{ id }] })}
        >
          delete
        </Button>
      </EdgeLabelRenderer> */}
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
          <stop offset="30%" stopColor="#d1d5db" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#e5e7eb" stopOpacity="1" />
        </linearGradient>
        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* 流光拖尾效果 */}
      <g filter={`url(#glow-${id})`}>
        {/* 拖尾椭圆 - 始终沿着线的方向 */}
        <ellipse rx="24" ry="1.5" fill={`url(#gradient-${id})`} opacity="0.9">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path={edgePath}
            rotate="auto"
          />
        </ellipse>
        {/* 主体光球 */}
        {/* <circle r="2" fill="#e5e7eb">
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
        </circle> */}
        {/* 内部高光 */}
        {/* <circle r="1" fill="#f9fafb" opacity="0.9">
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
        </circle> */}
      </g>
    </>
  );
}
