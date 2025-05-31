export class UnauthorizedError extends Error {
  code: number;

  constructor(message = "User not authorized") {
    super(message);
    this.code = 401;
  }
}
