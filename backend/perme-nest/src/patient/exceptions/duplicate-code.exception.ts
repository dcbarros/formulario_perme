import { AppException } from '../../exceptions/app.exception';
import { HttpStatus } from '@nestjs/common';

export class DuplicateCodeException extends AppException {
  public internalCode: string = 'patient.duplicate_code';

  public constructor() {
    super(
      'Já existe um paciente cadastrado com este prontuário.',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
