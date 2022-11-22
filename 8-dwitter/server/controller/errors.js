import { PageNotFoundError } from '../utils/errors.js'

const pageNotFound = (req, res, next) => {
  const { statusCode, message } = new PageNotFoundError();
  res.status(statusCode).json({ message });
}

const mainError = (err, req, res, next) => {
  const { statusCode = 500, message = "Server Problem" } = err;
  res.status(statusCode).json({ message })
}

export default {
  pageNotFound,
  mainError
}