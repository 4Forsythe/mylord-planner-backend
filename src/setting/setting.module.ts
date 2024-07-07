import { Module } from '@nestjs/common'

import { SettingController } from './setting.controller'

import { SettingService } from './setting.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  exports: [SettingService],
  controllers: [SettingController],
  providers: [SettingService, PrismaService]
})
export class SettingModule {}
