import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './entities/measurement.entity';
import { MeasurementRepository } from './repositories/measurement.repository';
import { PhysiotherapistRepository } from 'src/physiotherapist/repositories/physiotherapist.repository';
import { PatientRepository } from 'src/patient/repositories/patient.repository';
import { AdmissionRepository } from 'src/admission/repositories/admission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  exports: [TypeOrmModule, MeasurementService, MeasurementRepository],
  controllers: [MeasurementController],
  providers: [MeasurementService, MeasurementRepository, PhysiotherapistRepository, AdmissionRepository],
})
export class MeasurementModule {}
