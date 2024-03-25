import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAdmissionDto {
  @ApiProperty()
  @IsNotEmpty()
  admittedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  patientId: number;
}
