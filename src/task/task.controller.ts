import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { Auth } from 'src/auth/auth.decorator'
import { User } from 'src/user/user.decorator'

import { TaskDto } from './dto/task.dto'
import { TaskService } from './task.service'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe())
  async create(@User('id') userId: string, @Body() dto: TaskDto) {
    return this.taskService.create(userId, dto)
  }

  @Get()
  @Auth()
  async getAll(@User('id') userId: string) {
    return this.taskService.getAll(userId)
  }

  @Patch(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @User('id') userId: string,
    @Body() dto: TaskDto
  ) {
    return this.taskService.update(id, userId, dto)
  }

  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @User('id') userId: string) {
    return this.taskService.remove(id, userId)
  }
}
