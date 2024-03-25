import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PhysiotherapistService } from './physiotherapist.service';
import { CreatePhysiotherapistDto } from './dto/create-physiotherapist.dto';
import { UpdatePhysiotherapistDto } from './dto/update-physiotherapist.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

const physiotherapistExample = {
  id: 1,
  name: 'Nome',
  lastName: 'Sobrenome',
  identifier: 12345,
  password: '$2a$10$lcFiQYfJH4XtPMjywY4DZ.sZUi8OT4P6HMZKgY2sHlzh0wGxqxE4y',
  role: "physio",
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
        message: 'Fisioterapeuta não encontrado',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  },
};
@ApiBearerAuth()
@ApiTags('physiotherapist')
@Controller('physio')
export class PhysiotherapistController {
  constructor(
    private readonly physiotherapistService: PhysiotherapistService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all physiotherapists',
    content: {
      'application/json': {
        example: [physiotherapistExample],
      },
    },
  })
  async findAll(@Res() res: Response) {
    const physiotherapists = await this.physiotherapistService.findAll();
    return res.status(HttpStatus.OK).json(physiotherapists);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get one physiotherapist',
    content: {
      'application/json': {
        example: physiotherapistExample,
      },
    },
  })
  @ApiResponse(NotFoundResponse)
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const physiotherapist = await this.physiotherapistService.findOne(id);
    return res.status(HttpStatus.OK).json(physiotherapist);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'Update physiotherapist',
    content: {
      'application/json': {
        example: physiotherapistExample,
      },
    },
  })
  @ApiResponse(NotFoundResponse)
  @ApiResponse({
    status: 422,
    description: 'Not found',
    content: {
      'application/json': {
        example: {
          error: 'Deve atualizar pelo menos um campo',
        },
      },
    },
  })
  async update(
    @Param('id') id: number,
    @Body() data: UpdatePhysiotherapistDto,
    @Res() res: Response,
  ) {
    if (Object.keys(data).length === 0) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ error: 'Deve atualizar pelo menos um campo' });
    }

    const physiotherapist = await this.physiotherapistService.update(id, data);
    return res.status(HttpStatus.OK).json(physiotherapist);
  }

  //@UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create physiotherapist',
    content: {
      'application/json': {
        example: physiotherapistExample,
      },
    },
  })
  async create(@Body() data: CreatePhysiotherapistDto, @Res() res: Response) {
    const physiotherapist = await this.physiotherapistService.create(data);
    return res.status(HttpStatus.CREATED).json(physiotherapist);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Delete physiotherapist',
    content: {
      'application/json': {
        example: {
          message: 'Fisioterapeuta removido com sucesso',
        },
      },
    },
  })
  @ApiResponse(NotFoundResponse)
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.physiotherapistService.remove(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Fisioterapeuta removido com sucesso' });
  }
}
