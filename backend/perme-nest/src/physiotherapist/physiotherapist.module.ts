import { Module } from '@nestjs/common';
import { PhysiotherapistService } from './physiotherapist.service';
import { PhysiotherapistController } from './physiotherapist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Physiotherapist } from './entities/physiotherapist.entity';
import { PhysiotherapistRepository } from './repositories/physiotherapist.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Physiotherapist])],
  exports: [TypeOrmModule, PhysiotherapistService, PhysiotherapistRepository],
  controllers: [PhysiotherapistController],
  providers: [PhysiotherapistService, PhysiotherapistRepository],
})
export class PhysiotherapistModule {}
