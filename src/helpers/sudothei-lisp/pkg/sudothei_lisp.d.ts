/* tslint:disable */
/* eslint-disable */
/**
*/
export class Repl {
  free(): void;
/**
* @param {string} input
* @returns {string}
*/
  eval(input: string): string;
/**
* @param {string} procedure
* @param {string} arg1
* @param {string} arg2
*/
  apply(procedure: string, arg1: string, arg2: string): void;
/**
* @returns {Repl}
*/
  static new(): Repl;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_repl_free: (a: number) => void;
  readonly repl_eval: (a: number, b: number, c: number, d: number) => void;
  readonly repl_apply: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly repl_new: () => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
}

/**
* Synchronously compiles the given `bytes` and instantiates the WebAssembly module.
*
* @param {BufferSource} bytes
*
* @returns {InitOutput}
*/
export function initSync(bytes: BufferSource): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
