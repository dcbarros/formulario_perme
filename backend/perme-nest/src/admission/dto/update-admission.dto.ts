import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAdmissionDto {
  @ApiProperty()
  @IsNotEmpty()
  dischargedAt: Date;

  @IsNotEmpty()
  @ApiProperty({ type: 'enum', enum: ['Alta da fisioterapia', 'Alta hospitalar']})
  dischargedType: 'Alta da fisioterapia' | 'Alta hospitalar';

  @ApiProperty()
  observation: string;
}
