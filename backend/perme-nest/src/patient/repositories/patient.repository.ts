import { GenericRepository } from '../../db/repositories/generic.repository';
import { Patient } from '../entities/patient.entity';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

@Injectable()
export class PatientRepository extends GenericRepository<Patient> {
  constructor(private dataSource: DataSource) {
    super(Patient, dataSource);
  }

  async isInternalCodeAvailable(internalCode: string): Promise<boolean> {
    return !(await this.exist({ where: { internalCode } }));
  }

  async findByInternalCode(internalCode: string): Promise<Patient | null> {
    return this.findOneBy({ internalCode });
  }

  async addPatient(data: CreatePatientDto): Promise<Patient> {
    const patient = this.create(data);
    return this.save(patient);
  }

  async findById(id: number): Promise<Patient | null> {
    return this.findOneBy({ id });
  }

  async findAll(): Promise<Patient[]> {
    return this.find();
  }

  async updateOne(id: number, data: UpdatePatientDto): Promise<Patient | null> {
    const patient = await this.findById(id);

    const toSavePatient = this.create({
      ...patient,
      ...data,
    });
    return await this.save(toSavePatient);
  }

  async removeById(id: number): Promise<void> {
    await this.delete(id);
  }
}
