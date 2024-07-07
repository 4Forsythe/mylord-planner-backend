import { IsString, IsNumber, IsOptional } from 'class-validator'

export class TimeBlockDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  color?: string

  @IsNumber()
  duration: number

  @IsNumber()
  @IsOptional()
  order?: number
}
