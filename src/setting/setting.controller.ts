import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { Auth } from 'src/auth/auth.decorator'
import { User } from 'src/user/user.decorator'

import { SettingDto } from './dto/setting.dto'
import { SettingService } from './setting.service'

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('me')
  @Auth()
  async getSettings(@User('id') userId: string) {
    return this.settingService.getSettings(userId)
  }

  @Patch('me')
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(@User('id') userId: string, @Body() dto: SettingDto) {
    return this.settingService.update(userId, dto)
  }

  @Delete('me')
  @Auth()
  async reset(@User('id') userId: string) {
    return this.settingService.reset(userId)
  }
}
