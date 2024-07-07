import { IsNumber, IsBoolean, IsOptional } from 'class-validator'

export class SessionRoundDto {
  @IsNumber()
  seconds: number

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean
}
