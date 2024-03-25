import { DataSource } from 'typeorm';
import { Physiotherapist } from '../entities/physiotherapist.entity';
import { Injectable } from '@nestjs/common';
import { GenericRepository } from '../../db/repositories/generic.repository';
import { CreatePhysiotherapistDto } from '../dto/create-physiotherapist.dto';
import { UpdatePhysiotherapistDto } from '../dto/update-physiotherapist.dto';

@Injectable()
export class PhysiotherapistRepository extends GenericRepository<Physiotherapist> {
  constructor(private dataSource: DataSource) {
    super(Physiotherapist, dataSource);
  }

  async addPhysiotherapist(
    data: CreatePhysiotherapistDto,
  ): Promise<Physiotherapist> {
    const physiotherapist = this.create(data);
    return this.save(physiotherapist);
  }

  async findById(id: number): Promise<Physiotherapist | null> {
    return this.findOneBy({ id });
  }

  findByIdentifier(identifier: string): Promise<Physiotherapist | null> {
    return this.findOneBy({ identifier });
  }

  async findAll(): Promise<Physiotherapist[]> {
    return this.find();
  }

  async updateOne(
    id: number,
    data: UpdatePhysiotherapistDto,
  ): Promise<Physiotherapist | null> {
    if (data.passwordConfirmation) {
      delete data.passwordConfirmation;
    }

    const physiotherapist = await this.findById(id);

    const toSavePhysiotherapist = this.create({
      ...physiotherapist,
      ...data,
    });

    return await this.save(toSavePhysiotherapist);
  }

  async removeById(id: number): Promise<void> {
    await this.delete(id);
  }
}
