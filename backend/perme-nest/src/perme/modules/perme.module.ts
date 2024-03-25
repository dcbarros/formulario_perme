import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermeCategory } from '../entities/category.entity';
import { PermeService } from '../services/perme.service';
import { PermeOption } from '../entities/option.entity';
import { PermeItem } from '../entities/item.entity';
import { PermeController } from '../controllers/perme.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PermeCategory, PermeOption, PermeItem])],
  exports: [TypeOrmModule, PermeService],
  controllers: [PermeController],
  providers: [PermeService],
})
export class PermeModule {}
