import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../infrastructure/db/datasource';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { AdmissionModule } from './admission/admission.module';
import { MeasurementModule } from './measurement/measurement.module';
import { PhysiotherapistModule } from './physiotherapist/physiotherapist.module';
import { PermeModule } from './perme/modules/perme.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    PatientModule,
    AdmissionModule,
    MeasurementModule,
    PhysiotherapistModule,
    PermeModule
  ],
})
export class AppModule {}
