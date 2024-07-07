import { Module } from '@nestjs/common'

import { TaskModule } from 'src/task/task.module'

import { UserController } from './user.controller'

import { UserService } from './user.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  imports: [TaskModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule {}
