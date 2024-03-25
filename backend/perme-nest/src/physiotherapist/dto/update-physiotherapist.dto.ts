import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhysiotherapistDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  passwordConfirmation: string;
}
