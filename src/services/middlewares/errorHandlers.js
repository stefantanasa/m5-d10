export const badRequestHandler = (err, req, res, next) => {
  if (err.status === 400) {
    // if status is 400, I'm responsible of sending a response back, otherwise I'm sending the error to the next in chain
    if (err.errorsList) {
      res
        .status(400)
        .send({ message: err.message, errorsList: err.errorsList.array() });
    } else {
      res.status(400).send({ message: err.message });
    }
  } else {
    next(err);
  }
};

export const unauthorizedHandler = (err, req, res, next) => {
  if (err.status === 401) {
    // if status is 401, I'm responsible of sending a response back, otherwise I'm sending the error to the next in chain
    res.status(401).send({ message: err.message });
  } else {
    next(err);
  }
};

export const notFoundHandler = (err, req, res, next) => {
  console.log(err);
  if (err.status === 404) {
    // if status is 404, I'm responsible of sending a response back, otherwise I'm sending the error to the next in chain
    res.status(404).send({ message: err.message });
  } else {
    next(err);
  }
};

export const genericErrorHandler = (err, req, res, next) => {
  console.log(`Hello I am the generic error handler here is the error ${err}`);
  res.status(500).send({ message: "Generic Server Error" });
};
