import { DataSource } from 'typeorm';
import { Measurement } from '../entities/measurement.entity';
import { Injectable } from '@nestjs/common';
import { GenericRepository } from '../../db/repositories/generic.repository';
import { CreateMeasurementDto } from '../dto/create-measurement.dto';

@Injectable()
export class MeasurementRepository extends GenericRepository<Measurement> {
  constructor(private dataSource: DataSource) {
    super(Measurement, dataSource);
  }

  async addMeasurement(data: CreateMeasurementDto): Promise<Measurement> {
    const measurement = this.create({ ...data, admission: { id: data.admissionId }, physiotherapist: { id: data.physioId } });
    return this.save(measurement);
  }

  async findById(id: number): Promise<Measurement | null> {
    return this.findOneBy({ id });
  }

  async findAll(): Promise<Measurement[]> {
    return this.find();
  }

  async removeById(id: number): Promise<void> {
    await this.delete(id);
  }
}
