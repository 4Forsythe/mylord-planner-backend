import { Injectable, NotFoundException } from '@nestjs/common'

import { SessionDto } from './dto/session.dto'
import { SessionRoundDto } from './dto/session-round.dto'

import { PrismaService } from 'src/prisma.service'
import { SettingService } from 'src/setting/setting.service'

@Injectable()
export class SessionService {
  constructor(
    private prisma: PrismaService,
    private settingService: SettingService
  ) {}

  async create(userId: string) {
    const session = await this.getDailySession(userId)

    if (session) return session

    const user = await this.settingService.getIntervals(userId)

    if (!user) throw new NotFoundException('User is not found')

    return this.prisma.session.create({
      data: {
        rounds: {
          createMany: {
            data: Array.from({ length: user.intervals }, () => ({ seconds: 0 }))
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        rounds: true
      }
    })
  }

  async getDailySession(userId: string) {
    const today = new Date().toISOString().split('T')[0]

    return this.prisma.session.findFirst({
      where: {
        userId,
        createdAt: {
          gte: new Date(today)
        }
      },
      include: {
        rounds: {
          orderBy: { id: 'asc' }
        }
      }
    })
  }

  async update(id: string, userId: string, dto: Partial<SessionDto>) {
    return this.prisma.session.update({
      where: { id, userId },
      data: dto
    })
  }

  async updateRound(id: string, dto: Partial<SessionRoundDto>) {
    return this.prisma.sessionRound.update({
      where: { id },
      data: dto
    })
  }

  async remove(id: string, userId: string) {
    return this.prisma.session.delete({
      where: { id, userId }
    })
  }
}
