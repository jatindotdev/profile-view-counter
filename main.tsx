/* @jsxImportSource https://esm.sh/react@18.2.0 */

import { eraseAll, getAll, getCount, incrementCount } from "./db.ts";
import { init, initYoga, satori, serve, wasm } from "./deps.ts";

init(
  await (initYoga as unknown as (wasm: Uint8Array) => Promise<unknown>)(wasm)
);

const opts = {
  port: 3000,
};

interface MarkupProps {
  value: string;
  suffix?: string;
  error?: boolean;
}

interface MarkupPropsError {
  value: string;
  suffix?: string;
  error: boolean;
}

const markup = ({
  value,
  suffix = "views",
  error = false,
}: MarkupProps | MarkupPropsError) => (
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
    {error ? `${value}` : `${value} ${suffix}`}
  </div>
);

async function handler(req: Request) {
  const url = new URL(req.url);
  console.log(localStorage);
  // get first path segment
  const key = url.pathname.split("/")[1];

  if (req.method === "POST") {
    if (key === "erase") {
      eraseAll();
      return Response.json({ status: "ok", message: "All data erased" });
    }
  }

  if (req.method === "GET") {
    if (key === "all") {
      return Response.json({ status: "ok", data: getAll() });
    }

    if (key === "badge") {
      let params: MarkupProps | MarkupPropsError;

      const id = url.pathname.split("/")[2];

      if (!id) {
        params = {
          value: "try /badge/write_repo_name",
          error: true,
        };
      } else {
        incrementCount(id);
        const count = getCount(id).toString();

        params = {
          value: count,
        };
      }

      const svg = await satori(markup(params), {
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
          "cache-control": "max-age=0, no-cache, no-store, must-revalidate",
        },
      });
    }
  }

  return Response.json({ status: "ok" });
}

serve(handler, opts);
