import { Module } from '@nestjs/common'

import { SettingModule } from 'src/setting/setting.module'

import { SessionController } from './session.controller'

import { SessionService } from './session.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  imports: [SettingModule],
  exports: [SessionService],
  controllers: [SessionController],
  providers: [SessionService, PrismaService]
})
export class SessionModule {}
