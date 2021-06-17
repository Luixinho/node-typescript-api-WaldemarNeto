export class InternalError extends Error {
  // a ? na typagem é para dizer que esse campo é opcional
  constructor(
    public message: string,
    protected code: number = 500,
    protected description?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this.constructor);
  }
}
