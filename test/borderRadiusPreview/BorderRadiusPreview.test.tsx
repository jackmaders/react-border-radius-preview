import React from "react";
import userEvent from "@testing-library/user-event";
import { render, waitFor, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import BorderRadiusPreview from "../../src/borderRadiusPreview/BorderRadiusPreview";

describe("BorderRadiusPreview", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });

    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    vi.restoreAllMocks();
  });

  test("renders with initial state and checks if sliders are present", () => {
    render(<BorderRadiusPreview />);
    expect(screen.getByText("Top Left")).toBeInTheDocument();
    expect(screen.getByText("Top Right")).toBeInTheDocument();
    expect(screen.getByText("Bottom Left")).toBeInTheDocument();
    expect(screen.getByText("Bottom Right")).toBeInTheDocument();
  });

  test("copies correct borderRadius value to clipboard", async () => {
    render(<BorderRadiusPreview />);

    const copyButton = screen.getByText(/Copy to Clipboard/);
    userEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining("border-radius:")
      );
    });
  });
});
