import { IsNumber, IsOptional, Min, Max } from 'class-validator'

export class SettingDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  taskInterval?: number

  @IsNumber()
  @IsOptional()
  @Min(1)
  breakInterval?: number

  @IsNumber()
  @IsOptional()
  @Max(7)
  @Min(1)
  intervals?: number
}
