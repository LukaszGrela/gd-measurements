export function getSvgParent(
  element?: SVGElement | null
): SVGSVGElement | null {
  let currentNode: Node | null | undefined = element;

  // Traverse up until an SVG element is found or no more parents are left
  while (currentNode && currentNode.nodeName !== "svg") {
    currentNode = currentNode.parentNode;
  }

  // Return the found SVG element or null if not found
  return currentNode as SVGSVGElement | null;
}
