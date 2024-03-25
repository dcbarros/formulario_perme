import {
  Controller,
  Get,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PermeService } from '../services/perme.service';

const permeExample = {
  id: 1,
  position: 0,
  maxPoints: 3,
  description: 'Estado Mental',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  items: [{
    id: 1,
    position: 0,
    description: 'Estado de alerta no começo da avaliação',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    options: [{
      id: 1,
      points: 2,
      description: 'Não responsivo.',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    }]
  }]
};

@ApiTags('perme')
@Controller('perme')
export class PermeController {
  constructor(private readonly permeService: PermeService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all categories',
    content: {
      'application/json': {
        example: [permeExample],
      },
    },
  })
  async findAll(@Res() res: Response) {
    const perme = await this.permeService.getCombinedData();
    return res.status(HttpStatus.OK).json(perme);
  }
}
