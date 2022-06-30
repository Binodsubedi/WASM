var wasmExports = true;

let wasmMemory = new WebAssembly.Memory({ initial: 256, maximum: 256 });

let wasmTable = new WebAssembly.Table({
  initial: 1,
  maximum: 1 + 0,
  element: 'anyfunc',
});

var asmLibraryArg = {};

var info = {
  env: asmLibraryArg,
  wasi_snapshot_preview1: asmLibraryArg,
};

async function loadWasm() {
  let response = await fetch('functions.wasm');
  let bytes = await response.arrayBuffer();
  let wasmObj = await WebAssembly.instantiate(bytes, info);
  wasmExports = wasmObj.instance.exports;
}

loadWasm();
