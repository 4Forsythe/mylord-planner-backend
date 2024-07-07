import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator'

export class UserDto {
  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string
}
