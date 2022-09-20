import { createBubbles, randomInRange } from "./utils";

describe("human-bubbles/utils", () => {
  it("creates 'bubble' coords and dimension", () => {
    const bubbles = createBubbles(400, 200, 16);
    expect(bubbles.length).toEqual(32);
    expect(bubbles[0].top).toBe(0);
    expect(bubbles[0].left).toBe(0);
    expect(bubbles[1].top).toBe(0);
    expect(bubbles[1].left).toBe(50);
  });

  it("creates a random in range", () => {
    expect(randomInRange(100, 120)).toBeGreaterThanOrEqual(100);
    expect(randomInRange(100, 120)).toBeLessThanOrEqual(120);
  });
});
