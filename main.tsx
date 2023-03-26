/* @jsxImportSource https://esm.sh/react@18.2.0 */

import { satori, serve } from "./deps.ts";

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
      padding: "0.5px 2px 0.5px",
      textDecoration: "none",
      color: "#fff",
      borderRadius: "1.5px",
      fontSize: "4px",
    }}>
    {count} views
  </div>
);

async function handler(req: Request) {
  const url = new URL(req.url);

  console.log({ url });

  const svg = await satori(markup("500"), {
    height: 200,
    fonts: [
      {
        name: "Outfit",
        data: (await Deno.readFile("./fonts/outfit-regular.ttf")).buffer,
        style: "normal",
        weight: 400,
      },
      {
        name: "Outfit",
        data: (await Deno.readFile("./fonts/outfit-medium.ttf")).buffer,
        style: "normal",
        weight: 600,
      },
      {
        name: "Outfit",
        data: (await Deno.readFile("./fonts/outfit-bold.ttf")).buffer,
        style: "normal",
        weight: 800,
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
