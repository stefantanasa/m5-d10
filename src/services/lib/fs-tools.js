import { join } from "path";
import fs from "fs-extra";

const { writeFile } = fs;
export const authorPublicPath = join(process.cwd(), "./public/authors/avatar");

export const saveAuthorAvatar = (filename, bufferContent) => {
  writeFile(join(authorPublicPath, filename), bufferContent);
};

const mediaJSONPath = join(process.cwd(), "./src/services/media/media.json");
export const getMovies = () => JSON.parse(fs.readFileSync(mediaJSONPath));
export const writeMovie = (content) =>
  fs.writeFileSync(mediaJSONPath, JSON.stringify(content));
