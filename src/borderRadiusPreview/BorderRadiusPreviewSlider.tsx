import {
  Checkbox,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type BorderRadiusPreviewSliderProps = {
  title: string;
  verticalValue: number;
  horizontalValue: number;
  onVerticalChange: (value: number) => void;
  onHorizontalChange: (value: number) => void;
};

export default function BorderRadiusPreviewSlider({
  title,
  verticalValue,
  horizontalValue,
  onVerticalChange,
  onHorizontalChange,
}: BorderRadiusPreviewSliderProps) {
  const [matchDirection, setMatchDirection] = useState(true);

  useEffect(() => {
    if (!matchDirection) return;
    onHorizontalChange(verticalValue);
  }, [matchDirection, verticalValue, onHorizontalChange]);

  return (
    <div className="">
      <h3>
        <span className="font-bold">{`${title}`}</span> {" - "}
        <Checkbox
          defaultChecked
          checked={matchDirection}
          onChange={(e) => setMatchDirection(e.target.checked)}
        >
          Sync
        </Checkbox>
      </h3>
      <div className="">
        <label>
          <span className="text-sm">Vertical: {`${horizontalValue}%`}</span>
          <Slider
            name="vertical"
            aria-label="vertical"
            defaultValue={0}
            value={verticalValue}
            min={0}
            max={100}
            onChange={onVerticalChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </label>
        <label>
          <span className="text-sm">Horizontal: {`${horizontalValue}%`}</span>
          <Slider
            name="horizontal"
            aria-label="horizontal"
            defaultValue={0}
            value={horizontalValue}
            min={0}
            max={100}
            isDisabled={matchDirection}
            onChange={onHorizontalChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </label>
      </div>
    </div>
  );
}
