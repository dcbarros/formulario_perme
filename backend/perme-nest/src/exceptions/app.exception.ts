import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class AppException extends HttpException {
  public abstract internalCode: string;

  protected constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
