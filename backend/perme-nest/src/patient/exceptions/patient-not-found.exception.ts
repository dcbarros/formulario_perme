import { AppException } from '../../exceptions/app.exception';
import { HttpStatus } from '@nestjs/common';

export class PatientNotFoundException extends AppException {
  public internalCode = 'patient.not_found';

  constructor() {
    super('Paciente não registrado.', HttpStatus.NOT_FOUND);
  }
}
