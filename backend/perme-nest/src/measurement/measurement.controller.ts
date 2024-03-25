import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth, ApiResponse, } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotFoundError } from 'rxjs';

const measurementExample = {
  id: 1,
  score: 5,
	scoreTitle: "NÍVEL 1 - Perme: 0-6 pontos (Paciente não responsivo ou letárgico)",
	hospitalSector: "Enfermaria",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('measurement')
@Controller('measurement')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get measurements',
    content: {
      'application/json': {
        example: [measurementExample],
      },
    },
  })
  async findAll(@Res() res: Response) {
    const measurements = await this.measurementService.findAll();
    return res.status(HttpStatus.OK).json(measurements);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get one measurement',
    content: {
      'application/json': {
        example: measurementExample,
      },
    },
  })
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const measurement = await this.measurementService.findOne(id);
    return res.status(HttpStatus.OK).json(measurement);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create measurement',
    content: {
      'application/json': {
        example: measurementExample,
      },
    },
  })
  async create(@Body() data: CreateMeasurementDto, @Res() res: Response) {
    const measurement = await this.measurementService.create(data);
    return res.status(HttpStatus.CREATED).json(measurement);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Delete measurement',
    content: {
      'application/json': {
        example: {
          message: 'Medição removida com sucesso',
        },
      },
    },
  })
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.measurementService.remove(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Medição removida com sucesso' });
  }

  @Get('/combined/:id')
  @UseGuards(JwtAuthGuard)
  async findAllCombined(@Param('id') id: number, @Res() res: Response){
    const measurement = await this.measurementService.getCombinedData(id);
    return res.status(HttpStatus.OK).json(measurement);
  }
}
