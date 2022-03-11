import { body } from "express-validator";

export const movieValidator = [
  body("title").exists().withMessage("Title is mandatory"),
  body("year").exists().withMessage("Year is mandatory"),
  body("type").exists().withMessage("Type is mandatory"),
  body("poster").exists().withMessage("Poster is mandatory"),
];
export const reviewValidator = [
  body("comment").exists().withMessage("comment is mandatory"),
  body("rate").exists().withMessage("rate is mandatory"),
];
