class ApiError extends Error {
  constructor(message = "Something Went Wrong", statusCode, errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.error = errors;
    this.success = false;
    if (stack) {
      this.stack = stack;
      Error.CaptureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError } ;