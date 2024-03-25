import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class UpdatePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;
}
