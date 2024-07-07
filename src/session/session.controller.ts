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

import { SessionDto } from './dto/session.dto'
import { SessionRoundDto } from './dto/session-round.dto'

import { SessionService } from './session.service'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  @Auth()
  async getDailySession(@User('id') userId: string) {
    return this.sessionService.getDailySession(userId)
  }

  @Post()
  @Auth()
  async create(@User('id') userId: string) {
    return this.sessionService.create(userId)
  }

  @Patch(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @User('id') userId: string,
    @Body() dto: SessionDto
  ) {
    return this.sessionService.update(id, userId, dto)
  }

  @Patch('round/:id')
  @Auth()
  @UsePipes(new ValidationPipe())
  async updateRound(@Param('id') id: string, @Body() dto: SessionRoundDto) {
    return this.sessionService.updateRound(id, dto)
  }

  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string, @User('id') userId: string) {
    return this.sessionService.remove(id, userId)
  }
}
