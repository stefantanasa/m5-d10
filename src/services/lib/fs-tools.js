import { join } from "path";
import fs from "fs-extra";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const { writeFile } = fs;
export const authorPublicPath = join(process.cwd(), "./public/authors/avatar");

export const saveAuthorAvatar = (filename, bufferContent) => {
  writeFile(join(authorPublicPath, filename), bufferContent);
};

const mediaJSONPath = join(process.cwd(), "./src/services/media/media.json");
export const getMovies = () => JSON.parse(fs.readFileSync(mediaJSONPath));
export const writeMovie = (content) =>
  fs.writeFileSync(mediaJSONPath, JSON.stringify(content));

export const cloudUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "m5-d10",
    },
  }),
}).single("poster");
