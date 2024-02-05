import { ChakraProvider, Container } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import BorderRadiusPreview from "./borderRadiusPreview/BorderRadiusPreview";
import "./tailwind.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <React.StrictMode>
      <Container>
        <BorderRadiusPreview />
      </Container>
    </React.StrictMode>
  </ChakraProvider>
);
