import { KeyValue } from "./key-value.ts";
import { join } from "https://deno.land/std@0.181.0/path/mod.ts";

export class LocalStorage<T> extends KeyValue<T> {
  constructor(private _path: string = join(Deno.cwd(), "localstorage.json")) {
    super();
    const read = async () => {
      try {
        this.data = JSON.parse(await Deno.readTextFile(this._path));
      } catch (err) {
        if (err instanceof Deno.errors.NotFound)
          Deno.writeTextFileSync(this._path, JSON.stringify(this.data));
        else throw err;
      }
    };
    read();
  }
  /**
   * Sava data from memory to disk. Use it only when program end. Don't overuse it.
   */

  save(
    replacer?: (this: unknown, key: string, value: unknown) => unknown,
    space?: string | number
  ) {
    Deno.writeTextFile(this._path, JSON.stringify(this.data, replacer, space));
  }
}
