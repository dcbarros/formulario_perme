import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermeCategory } from '../entities/category.entity';
import { PermeOption } from '../entities/option.entity';

@Injectable()
export class PermeService {
  constructor(
    @InjectRepository(PermeCategory) private categoryRepository: Repository<PermeCategory>,
    @InjectRepository(PermeOption) private optionRepository: Repository<PermeOption>,
  ) {}

  async getCombinedData() {
    const categories = await this.categoryRepository.find({
      relations: ['items'],
    });

    for (const category of categories) {
      for (const item of category.items) {
        item.options = await this.optionRepository.find({
          where: { item: {id: item.id} },
        });
      }
    }

    return categories;
  }
}
