// src/ffmpeg-wasm.d.ts
declare module '@ffmpeg/ffmpeg' {
  export function createFFmpeg(options?: any): any;
  export function fetchFile(file: File): Promise<Uint8Array>;
}
