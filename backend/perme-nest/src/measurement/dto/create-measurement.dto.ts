import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMeasurementDto {
  @ApiProperty()
  @IsNotEmpty()
  score: number;

  @ApiProperty()
  @IsNotEmpty()
  scoreTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  physioId: number;

  @ApiProperty()
  @IsNotEmpty()
  admissionId: number;

  @ApiProperty({ type: 'enum', enum: ['CTI', 'Enfermaria']})
  @IsNotEmpty()
  hospitalSector: 'CTI' | 'Enfermaria'
}
