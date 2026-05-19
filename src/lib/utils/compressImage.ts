const MAX_PX = 1280;
const QUALITY = 0.78;

export async function compressImage(file: File): Promise<File> {
  // Non-image or SVG: pass through unchanged
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const { width: origW, height: origH } = bitmap;

  const scale = Math.min(1, MAX_PX / Math.max(origW, origH));
  const w = Math.round(origW * scale);
  const h = Math.round(origH * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) { reject(new Error("Canvas toBlob failed")); return; }
        resolve(new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
          type: "image/jpeg",
          lastModified: Date.now(),
        }));
      },
      "image/jpeg",
      QUALITY,
    );
  });
}
