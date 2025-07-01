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
