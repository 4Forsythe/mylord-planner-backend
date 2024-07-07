import { Injectable } from '@nestjs/common'

import { SettingDto } from './dto/setting.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class SettingService {
  constructor(private prisma: PrismaService) {}

  async getSettings(userId: string) {
    return this.prisma.setting.findUnique({
      where: { userId },
      select: {
        id: true,
        taskInterval: true,
        breakInterval: true,
        intervals: true,
        createdAt: true,
        updatedAt: true
      }
    })
  }

  async getIntervals(userId: string) {
    return this.prisma.setting.findUnique({
      where: { userId },
      select: {
        intervals: true
      }
    })
  }

  async update(userId: string, dto: SettingDto) {
    return this.prisma.setting.update({
      where: { userId },
      data: dto
    })
  }

  async reset(userId: string) {
    return this.prisma.$transaction(async prisma => {
      await prisma.setting.delete({
        where: { userId }
      })

      return prisma.setting.create({
        data: { userId }
      })
    })
  }
}
