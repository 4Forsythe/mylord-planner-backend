import { Priority } from '@prisma/client'

import { Transform } from 'class-transformer'
import { IsString, IsBoolean, IsOptional, IsEnum } from 'class-validator'

export class TaskDto {
  @IsString()
  @IsOptional()
  name: string

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean

  @IsEnum(Priority)
  @IsOptional()
  @Transform(({ value }) => ('' + value).toLowerCase())
  priority?: Priority
}
