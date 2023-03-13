import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SpotifyNowPlaying from "./spotify/SpotifyNowPlaying";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <SpotifyNowPlaying />
    </ChakraProvider>
  </React.StrictMode>
);
