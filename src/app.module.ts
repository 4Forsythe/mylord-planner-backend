import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { SettingModule } from './setting/setting.module'
import { TaskModule } from './task/task.module'
import { SessionModule } from './session/session.module'

import { AppController } from './app.controller'

import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    SettingModule,
    TaskModule,
    SessionModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
