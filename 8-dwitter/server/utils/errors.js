class AppError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

class IDNotFound extends AppError {
  constructor(ID) {
    super(400, `ID ${ID} not exists`);
  }
}

class UserNotFound extends AppError {
  constructor(username) {
    super(400, `username ${username} not exists`);
  }
}

class PageNotFoundError extends AppError {
  constructor() {
    super(404, "URL NOT EXISTS");
  }
}

export { IDNotFound, UserNotFound, PageNotFoundError }