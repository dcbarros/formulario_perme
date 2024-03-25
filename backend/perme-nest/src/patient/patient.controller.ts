import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

const patientExample = {
  id: 1,
  fullName: 'Nome',
  internalCode: 12345,
  entryDate: "2023-10-10",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

const admissionExample = {
  id: 1,
  admittedAt: new Date(),
	dischargedAt: new Date(),
	observation: null,
	dischargedType: "Alta hospitalar",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

const measurementExample = {
  id: 1,
  score: 5,
	scoreTitle: "NÍVEL 1 - Perme: 0-6 pontos (Paciente não responsivo ou letárgico)",
	hospitalSector: "Enfermaria",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};

const NotFoundResponse = {
  status: 404,
  description: 'Not found',
  content: {
    'application/json': {
      example: {
        message: 'Paciente não encontrado',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  },
};

@ApiBearerAuth()
@ApiTags('patient')
@Controller('patient')
@UseGuards(JwtAuthGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create patient',
    content: {
      'application/json': {
        example: patientExample,
      },
    },
  })
  async create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all patients',
    content: {
      'application/json': {
        example: [patientExample],
      },
    },
  })
  async findAll() {
    return this.patientService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get one patient',
    content: {
      'application/json': {
        example: patientExample,
      },
    },
  })
  @ApiResponse(NotFoundResponse)
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const patient = await this.patientService.findOneById(id);
    return res.status(HttpStatus.OK).json(patient);
  }


  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'Update patient',
    content: {
      'application/json': {
        example: patientExample,
      },
    },
  })
  @ApiResponse(NotFoundResponse)
  async update(@Param('id') id: number, @Body() data: UpdatePatientDto, @Res() res: Response,) {
    if (Object.keys(data).length === 0) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ error: 'Deve atualizar pelo menos um campo' });
    }

    const patient = await this.patientService.update(id, data);
 
    return res.status(HttpStatus.OK).json(patient);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Delete patient',
    content: {
      'application/json': {
        example: {
          message: 'Paciente removido com sucesso',
        },
      },
    },
  })
  @ApiResponse(NotFoundResponse)
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.patientService.remove(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Paciente removido com sucesso' });
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get patient data with relations: admissions and measurements',
    content: {
      'application/json': {
        example: [{...patientExample, admissions: [{...admissionExample, measurements: [measurementExample]}]}],
      },
    },
  })
  @ApiResponse(NotFoundResponse)
  @Get('/combined/:id')
  async findAllCombined(@Param('id') id: number, @Res() res: Response) {
    const patient = await this.patientService.getCombinedData(id);
    return res.status(HttpStatus.OK).json(patient);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse(NotFoundResponse)
  @Get('/patientBoard/:id')
  async getPatientInfoByDashboard(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.patientService.getPatientInfoByDashboard(id));
  }

}
