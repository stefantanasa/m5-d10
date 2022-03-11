import express from "express";
import { movieValidator, reviewValidator } from "../middlewares/validator.js";
import { validationResult } from "express-validator";
import { getMovies, writeMovie } from "../lib/fs-tools.js";
import createError from "http-errors";
import unique from "unique";

const mediaRouter = express.Router();

mediaRouter.post("/", movieValidator, (req, res, next) => {
  const errorsList = validationResult(req);
  try {
    if (errorsList.isEmpty()) {
      const newMedia = {
        ...req.body,
        createdAt: new Date(),
        imdbId: unique(),
        reviews: [],
      };
      const mediaArray = getMovies();
      mediaArray.push(newMedia);
      console.log(mediaArray);
      writeMovie(mediaArray);
      res.status(201).send(newMedia);
    } else {
      next(
        createError(400, `Some errors in the req body`, { errorsList })
        //it does not show the error list in the postman response without res.send
      );
    }
  } catch (error) {
    next(error);
  }
});

mediaRouter.get("/", (req, res, next) => {
  try {
    const media = getMovies();
    if (media.length === 0) {
      next(createError(404), "There are no blogs!");
    } else {
      res.status(200).send(media);
    }
  } catch (error) {
    next(error);
  }
});
mediaRouter.get("/:imdbId", (req, res, next) => {
  const mediaArray = getMovies();

  // const index = moviesArray.findIndex((movie) => {
  //   console.log({ imdbId: movie.imdbId, params: imdbId });
  //   return movie.imdbId.toString() === imdbId;
  // });

  const foundMedia = mediaArray.find((m) => {
    return m.imdbId.toString() === req.params.imdbId;
  });
  if (foundMedia) {
    {
      res.status(200).send(foundMedia);
    }
  } else {
    {
      res.status(200).send("media not found!");
    }
  }
});

mediaRouter.put("/:imdbId", (req, res, next) => {
  const imdbId = req.params.imdbId;
  const moviesArray = getMovies();

  const index = moviesArray.findIndex(
    (movie) => movie.imdbId.toString() === imdbId
  );
  console.log(moviesArray[index]);

  if (index !== -1) {
    const oldMovie = moviesArray[index];

    const updateMovie = { ...oldMovie, ...req.body, updatedAt: new Date() };

    moviesArray[index] = updateMovie;

    writeMovie(moviesArray);

    res.send(updateMovie);
  }
});
mediaRouter.post("/:imdbId/reviews", reviewValidator, (req, res, next) => {
  try {
    const errorsList = validationResult(req);
    console.log(errorsList);
    const moviesArray = getMovies();

    const imdbId = req.params.imdbId;

    console.log(moviesArray);
    if (errorsList.isEmpty()) {
      const index = moviesArray.findIndex((movie) => {
        console.log({ imdbId: movie.imdbId, params: imdbId });
        return movie.imdbId.toString() === imdbId;
      });
      console.log(`index: ${index}`);

      if (index !== -1) {
        // oldMovie = {
        //   ...oldMovie,
        //   reviews: [],
        // };
        moviesArray[index].reviews.push({
          ...req.body,
          createdAt: new Date(),
          _id: unique(),
          elementId: req.params.imdbId,
        });

        writeMovie(moviesArray);

        res.status(201).send(moviesArray[index].reviews);
      } else {
        res.send("Movie not found!");
      }
    } else {
      next(createError(400, `Some errors in the req body`, { errorsList }));
    }
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
