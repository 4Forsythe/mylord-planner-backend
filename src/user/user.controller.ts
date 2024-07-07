import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { User } from './user.decorator'
import { Auth } from 'src/auth/auth.decorator'

import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Auth()
  async getProfile(@User('id') id: string) {
    return this.userService.getProfile(id)
  }

  @Patch('me')
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(@User('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }

  @Delete('me')
  @Auth()
  async delete(@User('id') userId: string) {
    return this.userService.remove(userId)
  }
}
