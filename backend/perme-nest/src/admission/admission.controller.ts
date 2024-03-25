import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { Response, query } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

@ApiBearerAuth()
@ApiTags('admission')
@Controller('admission')
@UseGuards(JwtAuthGuard)
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create admission',
    content: {
      'application/json': {
        example: admissionExample,
      },
    },
  })
  create(@Body() createAdmissionDto: CreateAdmissionDto) {
    return this.admissionService.create(createAdmissionDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all admissions',
    content: {
      'application/json': {
        example: [admissionExample],
      },
    },
  })
  findAll() {
    return this.admissionService.findAll();
  }

  @Get('/graph')
  async findAllActivePatient(){
    return this.admissionService.getAllActivePatient();
  }

  @Get('/table')
  async getAllPatientsData(@Query('limit') limit: number, @Query('offset') offset: number){
    return this.admissionService.getAllPatientsInformation(limit, offset);
  }


  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get one admissions',
    content: {
      'application/json': {
        example: admissionExample,
      },
    },
  })
  findOne(@Param('id') id: number) {
    return this.admissionService.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'Update one admission',
    content: {
      'application/json': {
        example: admissionExample,
      },
    },
  })
  async update(
    @Param('id') id: number,
    @Body() data: UpdateAdmissionDto,
    @Res() res: Response,
  ) {
    if (Object.keys(data).length === 0) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ error: 'Deve atualizar pelo menos um campo' });
    }

    const admission = await this.admissionService.update(id, data);
    return res.status(HttpStatus.OK).json(admission);
  }
}
