/* @jsxImportSource https://esm.sh/react@18.2.0 */

import { init, initYoga, satori, serve, wasm } from "./deps.ts";

init(
  await (initYoga as unknown as (wasm: Uint8Array) => Promise<unknown>)(wasm)
);

const opts = {
  port: 3000,
};

const markup = (count: string) => (
  <div
    style={{
      all: "unset",
      display: "flex",
      height: "30px",
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

  console.log({ url });

  const svg = await satori(markup("500"), {
    height: 30,
    fonts: [
      {
        name: "Outfit",
        data: await Deno.readFile("./fonts/outfit-regular.ttf"),
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
