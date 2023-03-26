import { KeyValue, keyValue } from "./key-value.ts";
import { join } from "https://deno.land/std@0.181.0/path/mod.ts";
import { readJson, writeJson } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";

const encode = new TextEncoder().encode;

export class LocalStorage<T> extends KeyValue<T> {
  constructor(private _path: string = join(Deno.cwd(), "localstorage.json")) {
    super();
    const read = async () => {
      try {
        this.data = (await readJson(this._path)) as keyValue<T>;
      } catch (err) {
        if (err instanceof Deno.errors.NotFound)
          Deno.writeFile(this._path, encode(JSON.stringify(this.data)));
        else throw err;
      }
    };
    read();
  }
  /**
   * Sava data from memory to disk. Use it only when program end. Don't overuse it.
   */

  save() {
    writeJson(this._path, this.data);
  }
}
