import { Module } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';
import { PatientRepository } from 'src/patient/repositories/patient.repository';
import { AdmissionRepository } from './repositories/admission.repository';

@Module({
  controllers: [AdmissionController],
  providers: [AdmissionService, PatientRepository, AdmissionRepository],
})
export class AdmissionModule {}
