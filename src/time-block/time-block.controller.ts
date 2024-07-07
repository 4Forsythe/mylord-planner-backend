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

import { TimeBlockDto } from './dto/time-block.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

import { TimeBlockService } from './time-block.service'

@Controller('time-block')
export class TimeBlockController {
  constructor(private readonly timeBlockService: TimeBlockService) {}

  @Get()
  @Auth()
  async getAll(@User('id') userId: string) {
    return this.timeBlockService.getAll(userId)
  }

  @Post()
  @Auth()
  @UsePipes(new ValidationPipe())
  async create(@User('id') userId: string, @Body() dto: TimeBlockDto) {
    return this.timeBlockService.create(userId, dto)
  }

  @Patch('order')
  @Auth()
  @UsePipes(new ValidationPipe())
  async updateOrder(@Body() dto: UpdateOrderDto) {
    return this.timeBlockService.updateOrder(dto.ids)
  }

  @Patch(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @User('id') userId: string,
    @Body() dto: TimeBlockDto
  ) {
    return this.timeBlockService.update(id, userId, dto)
  }

  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @User('id') userId: string) {
    return this.timeBlockService.remove(id, userId)
  }
}
