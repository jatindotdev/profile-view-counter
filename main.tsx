/* @jsxImportSource https://esm.sh/react@18.2.0 */

import { satori, serve } from "./deps.ts";
import { readFileSync } from "node:fs";

const opts = {
  port: 3000,
};

const markup = (count: string) => (
  <div
    style={{
      all: "unset",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fd5d5d",
      padding: "2px 8px 4px",
      textDecoration: "none",
      color: "#fff",
      borderRadius: "6px",
      fontSize: "18px",
    }}>
    {count} views
  </div>
);

async function handler(req: Request) {
  const url = new URL(req.url);

  const fontData = readFileSync("./fonts/outfit-regular.ttf");

  console.log({ url });

  const svg = await satori(markup("500"), {
    height: 200,
    fonts: [
      {
        name: "Outfit",
        data: fontData,
        style: "normal",
        weight: 400,
      },
    ],
  });

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml",
    },
  });
}

serve(handler, opts);
