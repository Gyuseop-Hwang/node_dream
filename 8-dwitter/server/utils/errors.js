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
    super(400, username ? `username ${username} not exists` : "No users");
  }
}

class PageNotFoundError extends AppError {
  constructor() {
    super(404, "url is not exists");
  }
}

class SignupError extends AppError {
  constructor() {
    super(409, "username already exists")
  }
}

class LoginError extends AppError {
  constructor() {
    super(401, "username or password is not correct")
  }
}

class LoginRequired extends AppError {
  constructor() {
    super(401, "login is required")
  }
}

class AuthError extends AppError {
  constructor() {
    super(403, "you are not authenticated")
  }
}


export {
  IDNotFound,
  UserNotFound,
  PageNotFoundError,
  SignupError,
  LoginError,
  LoginRequired,
  AuthError
}