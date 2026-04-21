export class OutOfBoundsError extends Error {
  constructor(message = "Out of bounds") {
    super(message);
    this.name = "OutOfBoundsError";
    Object.setPrototypeOf(this, OutOfBoundsError.prototype);
  }
}

export function isOutOfBoundsError(err: unknown): err is OutOfBoundsError {
  return err instanceof OutOfBoundsError;
}
