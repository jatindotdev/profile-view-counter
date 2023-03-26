import cacheDir from "https://deno.land/x/cache_dir@0.2.0/mod.ts";

export { serve } from "https://deno.land/std@0.181.0/http/server.ts";
export { default as satori, init } from "https://esm.sh/satori@0.4.4/wasm";
export { default as initYoga } from "https://esm.sh/yoga-wasm-web@0.3.3";

export const wasm = await Deno.readFile(
  `${cacheDir()}/deno/npm/registry.npmjs.org/yoga-wasm-web/0.3.3/dist/yoga.wasm`
);
