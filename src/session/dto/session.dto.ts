import { IsBoolean, IsOptional } from 'class-validator'

export class SessionDto {
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean
}
