import { ApiHideProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiHideProperty()
  readonly email: string;

  @ApiHideProperty()
  readonly password: string;
}
