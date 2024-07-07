import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator'

export class AuthDto {
  @IsEmail()
  email: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @MinLength(6)
  password: string
}
