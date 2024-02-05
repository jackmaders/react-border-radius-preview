import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BorderRadiusPreviewSlider from "./BorderRadiusPreviewSlider";
import { CopyIcon } from "@chakra-ui/icons";

export default function BorderRadiusPreview() {
  const [borderRadius, setBorderRadius] = useState("");

  const [topLeftHorizontal, setTopLeftHorizontal] = useState(0);
  const [topLeftVertical, setTopLeftVertical] = useState(0);

  const [topRightHorizontal, setTopRightHorizontal] = useState(0);
  const [topRightVertical, setTopRightVertical] = useState(0);

  const [bottomRightHorizontal, setBottomRightHorizontal] = useState(0);
  const [bottomRightVertical, setBottomRightVertical] = useState(0);

  const [bottomLeftHorizontal, setBottomLeftHorizontal] = useState(0);
  const [bottomLeftVertical, setBottomLeftVertical] = useState(0);

  useEffect(() => {
    const borderRadiusHorizontalString = `${topLeftHorizontal}% ${topRightHorizontal}% ${bottomRightHorizontal}% ${bottomLeftHorizontal}% `;
    const borderRadiusVerticalString = `${topLeftVertical}% ${topRightVertical}% ${bottomRightVertical}% ${bottomLeftVertical}% `;

    const borderRadiusString = `${borderRadiusHorizontalString} / ${borderRadiusVerticalString}`;
    setBorderRadius(borderRadiusString);
  }, [
    topLeftHorizontal,
    topLeftVertical,
    topRightHorizontal,
    topRightVertical,
    bottomRightHorizontal,
    bottomRightVertical,
    bottomLeftHorizontal,
    bottomLeftVertical,
  ]);

  const toast = useToast();

  async function copyStylingToClipboard() {
    const borderRadiusCSS = `border-radius: ${borderRadius}`;

    navigator.clipboard.writeText(borderRadiusCSS);

    toast({
      title: "Copied styling to clipboard.",
      description: borderRadiusCSS,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Card>
      <CardHeader>
        <div
          className="bg-red-400 w-full aspect-video"
          style={{ borderRadius }}
        ></div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 w-full gap-4">
          <BorderRadiusPreviewSlider
            title="Top Left"
            horizontalValue={topLeftHorizontal}
            verticalValue={topLeftVertical}
            onHorizontalChange={setTopLeftHorizontal}
            onVerticalChange={setTopLeftVertical}
          />
          <BorderRadiusPreviewSlider
            title="Top Right"
            horizontalValue={topRightHorizontal}
            verticalValue={topRightVertical}
            onHorizontalChange={setTopRightHorizontal}
            onVerticalChange={setTopRightVertical}
          />
          <BorderRadiusPreviewSlider
            title="Bottom Left"
            horizontalValue={bottomLeftHorizontal}
            verticalValue={bottomLeftVertical}
            onHorizontalChange={setBottomLeftHorizontal}
            onVerticalChange={setBottomLeftVertical}
          />
          <BorderRadiusPreviewSlider
            title="Bottom Right"
            horizontalValue={bottomRightHorizontal}
            verticalValue={bottomRightVertical}
            onHorizontalChange={setBottomRightHorizontal}
            onVerticalChange={setBottomRightVertical}
          />
        </div>
      </CardBody>
      <CardFooter className="flex justify-center">
        <Button onClick={copyStylingToClipboard}>
          Copy to Clipboard &nbsp;
          <CopyIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}
