import { describe, expect, test } from "vitest";
import { throttle } from "./throttle.ts";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
describe("throttle behaviour", () => {
  test("leading edge fires immediately, trailing edge after wait with the latest args", async () => {
    const calls: number[] = [];
    const fn = throttle((value: number) => calls.push(value), 60);

    fn(1);
    // "leading call must be synchronous"
    expect(calls).toEqual([1]);

    fn(2);
    fn(3);
    // "no call inside the wait window"
    expect(calls).toEqual([1]);

    await sleep(120);
    // "trailing call uses the latest args"
    expect(calls).toEqual([1, 3]);
  });

  test("cancel drops the pending trailing call", async () => {
    const calls: number[] = [];
    const fn = throttle((value: number) => calls.push(value), 60);

    fn(1);
    fn(2);
    fn.cancel();

    await sleep(120);
    expect(calls).toEqual([1]);
  });

  test("flush invokes the pending call immediately and is idempotent", () => {
    const calls: number[] = [];
    const fn = throttle((value: number) => calls.push(value), 1000);

    fn(1);
    fn(2);
    fn.flush();
    expect(calls).toEqual([1, 2]);

    fn.flush();
    expect(calls).toEqual([1, 2]);
  });

  test("calls spaced beyond the wait window each fire on the leading edge", async () => {
    const calls: number[] = [];
    const fn = throttle((value: number) => calls.push(value), 30);

    fn(1);
    await sleep(60);
    fn(2);
    await sleep(60);
    fn(3);

    expect(calls).toEqual([1, 2, 3]);
  });

  test("wait = 0 invokes every call and cancel before any call is safe", () => {
    const calls: number[] = [];
    const fn = throttle((value: number) => calls.push(value));

    fn(1);
    fn(2);
    expect(calls).toEqual([1, 2]);

    const idle = throttle(() => {}, 50);
    idle.cancel();
    idle.flush();
  });
});
