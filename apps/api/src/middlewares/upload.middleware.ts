import multer from "multer";

const storage = multer.memoryStorage();

export const productMediaUpload = multer({
  storage,
  limits: { fileSize: 40 * 1024 * 1024 }, // 40MB
}).fields([
  { name: "images", maxCount: 5 },
  { name: "video", maxCount: 1 },
  { name: "pdf", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
  { name: "videoThumbnail", maxCount: 1 },
]);

export const cvUpload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB CV size limit
}).single("cv");

declare global {
  namespace Express {
    interface Request {
      files?:
        | {
            [fieldname: string]: Express.Multer.File[];
          }
        | Express.Multer.File[];
    }
  }
}
