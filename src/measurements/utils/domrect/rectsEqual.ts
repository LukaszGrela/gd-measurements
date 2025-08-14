export function rectsEqual(rectA: DOMRect | null, rectB: DOMRect | null) {
  if (!rectA || !rectB) return false;

  return (
    rectA.x === rectB.x &&
    rectA.y === rectB.y &&
    rectA.width === rectB.width &&
    rectA.height === rectA.height
  );
}
