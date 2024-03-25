import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './repositories/patient.repository';
import { MeasurementRepository } from 'src/measurement/repositories/measurement.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  exports: [TypeOrmModule, PatientService, PatientRepository],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository, MeasurementRepository],
})
export class PatientModule {}
