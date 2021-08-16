import { IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  public email: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public password: string;

  @IsString()
  public repassword: string;
}

export default CreateUserDto;