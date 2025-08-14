import { rectsEqual } from "./rectsEqual";

describe("utils", () => {
  describe("rectsEqual", () => {
    it("returns true for equal rectangles", () => {
      const rect1 = new DOMRect(0, 0, 100, 100);
      const rect2 = new DOMRect(0, 0, 100, 100);
      expect(rectsEqual(rect1, rect2)).toBe(true);
    });

    it("returns false for different rectangles", () => {
      const rect1 = new DOMRect(0, 0, 100, 100);
      const rect2 = new DOMRect(10, 10, 50, 50);
      expect(rectsEqual(rect1, rect2)).toBe(false);
    });

    it("returns false for different dimensions", () => {
      const rect1 = new DOMRect(0, 0, 100, 100);
      const rect2 = new DOMRect(0, 0, 200, 200);
      expect(rectsEqual(rect1, rect2)).toBe(false);

      const rect3 = new DOMRect(0, 0, 100, 200);
      expect(rectsEqual(rect1, rect3)).toBe(false);

      const rect4 = new DOMRect(10, 0, 100, 100);
      expect(rectsEqual(rect1, rect4)).toBe(false);

      const rect5 = new DOMRect(0, 10, 100, 100);
      expect(rectsEqual(rect1, rect5)).toBe(false);

      const rect6 = new DOMRect(0, 0, 200, 100);
      expect(rectsEqual(rect1, rect6)).toBe(false);
    });

    it("returns false for null rect", () => {
      const rect1 = new DOMRect(0, 0, 100, 100);
      const rect2 = new DOMRect(0, 0, 200, 200);
      expect(rectsEqual(null, rect2)).toBe(false);
      expect(rectsEqual(rect1, null)).toBe(false);
      expect(rectsEqual(null, null)).toBe(false);
    });
  });
});
