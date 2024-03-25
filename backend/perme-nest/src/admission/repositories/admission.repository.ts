import { GenericRepository } from '../../db/repositories/generic.repository';
import { Admission } from '../entities/admission.entity';
import { DataSource } from 'typeorm';
import { CreateAdmissionDto } from '../dto/create-admission.dto';
import { Injectable } from '@nestjs/common';
import { UpdateAdmissionDto } from '../dto/update-admission.dto';

@Injectable()
export class AdmissionRepository extends GenericRepository<Admission> {
  constructor(private dataSource: DataSource) {
    super(Admission, dataSource);
  }

  async addAdmission(data: CreateAdmissionDto): Promise<Admission> {
    const admission = this.create({...data, patient: {id: data.patientId}});
    return this.save(admission);
  }

  async findById(id: number): Promise<Admission | null> {
    return this.findOneBy({ id });
  }

  async findAll(): Promise<Admission[]> {
    return this.find();
  }

  async updateOne(
    id: number,
    data: UpdateAdmissionDto,
  ): Promise<Admission | null> {

    const admission = await this.findById(id);

    const toSaveAdmission = this.create({
      ...admission,
      ...data,
    });

    return await this.save(toSaveAdmission);
  }
}
