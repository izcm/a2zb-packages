import { describe, it } from "vitest";

/*
 * Hints:
 * - Mock sonner's <Toaster> and assert on the props it receives:
 *     vi.mock("sonner", () => ({ Toaster: vi.fn(() => null) }))
 *     vi.mocked(Toaster).mock.lastCall?.[0]
 *   (the real Toaster renders nothing until a toast exists, and adds toasts async)
 * - Fake window.matchMedia with vi.spyOn so you control `matches` and can fire
 *   the "change" listener inside act(). happy-dom's default width is 1024px,
 *   so the default "(max-width: 1024px)" query matches anyway.
 * - vitest.config has no `globals`/`restoreMocks`: call cleanup() from
 *   @testing-library/react and vi.restoreAllMocks() in afterEach yourself.
 */

describe("ResponsiveToaster", () => {
  describe("position", () => {
    it.todo("uses position (bottom-right) on large screens");
    it.todo("uses smallScreenPosition (top-center) when the query matches");
    it.todo("follows media query changes in both directions");
    it.todo("respects custom smallScreenQuery, position and smallScreenPosition");
  });

  describe("props", () => {
    it.todo("applies defaults: closeButton, invert, toastOptions classNames");
    it.todo("lets callers override defaults; toastOptions replaces the default as a whole");
    it.todo("passes other sonner props through, but not smallScreenQuery/smallScreenPosition");
  });

  describe("unmount", () => {
    it.todo("removes the media query change listener");
  });
});
