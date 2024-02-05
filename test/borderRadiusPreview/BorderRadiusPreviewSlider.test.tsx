import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import BorderRadiusPreviewSlider from "../../src/borderRadiusPreview/BorderRadiusPreviewSlider";
import { afterEach } from "node:test";

describe("<BorderRadiusPreviewSlider />", () => {
  beforeEach(() => {
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

  it("renders the component with initial props", () => {
    const borderRadiusPreviewSliderProps = {
      title: "Test Title",
      verticalValue: 30,
      horizontalValue: 30,
      onVerticalChange: () => {},
      onHorizontalChange: () => {},
    };

    render(<BorderRadiusPreviewSlider {...borderRadiusPreviewSliderProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText(/Vertical:/)).toBeInTheDocument();
    expect(screen.getByText(/Horizontal:/)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("syncs horizontal slider with vertical slider when matchDirection is true", () => {
    const borderRadiusPreviewSliderProps = {
      title: "Test Title",
      verticalValue: 30,
      horizontalValue: 30,
      onVerticalChange: () => {},
      onHorizontalChange: () => {},
    };

    const onHorizontalChangeSpy = vi.spyOn(
      borderRadiusPreviewSliderProps,
      "onHorizontalChange"
    );

    const { rerender } = render(
      <BorderRadiusPreviewSlider {...borderRadiusPreviewSliderProps} />
    );

    borderRadiusPreviewSliderProps.verticalValue = 50;
    rerender(<BorderRadiusPreviewSlider {...borderRadiusPreviewSliderProps} />);

    expect(onHorizontalChangeSpy).toHaveBeenCalledWith(50);
  });

  it("does not sync sliders when matchDirection is false", () => {
    const borderRadiusPreviewSliderProps = {
      title: "Test Title",
      verticalValue: 30,
      horizontalValue: 30,
      onVerticalChange: () => {},
      onHorizontalChange: () => {},
    };
    const { rerender } = render(
      <BorderRadiusPreviewSlider {...borderRadiusPreviewSliderProps} />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    borderRadiusPreviewSliderProps.verticalValue = 50;
    rerender(<BorderRadiusPreviewSlider {...borderRadiusPreviewSliderProps} />);

    const onHorizontalChangeSpy = vi.spyOn(
      borderRadiusPreviewSliderProps,
      "onHorizontalChange"
    );

    expect(onHorizontalChangeSpy).not.toHaveBeenCalledWith(50);
  });
});
