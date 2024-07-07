import { Injectable } from '@nestjs/common'

import { hash } from 'argon2'
import { startOfDay, subDays } from 'date-fns'

import { UserDto } from './dto/user.dto'

import { PrismaService } from 'src/prisma.service'
import { TaskService } from 'src/task/task.service'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private taksService: TaskService
  ) {}

  async create(dto: UserDto) {
    const user = {
      email: dto.email,
      name: dto.name,
      password: await hash(dto.password)
    }

    return this.prisma.user.create({
      data: {
        ...user,
        settings: {
          create: {}
        }
      },
      include: {
        settings: true
      }
    })
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        tasks: true
      }
    })
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }

  async getProfile(id: string) {
    const profile = await this.getById(id)

    const today = startOfDay(new Date())
    const week = startOfDay(subDays(new Date(), 7))

    const totalTasks = profile.tasks.length
    const completedTasks = await this.taksService.getCompletedCount(profile.id)
    const dailyTasks = await this.taksService.getCountByDate(profile.id, today)
    const weeklyTasks = await this.taksService.getCountByDate(profile.id, week)

    const { password, ...user } = profile

    return {
      user,
      statistics: [
        { property: 'Total', count: totalTasks },
        { property: 'Completed', count: completedTasks },
        { property: 'Daily', count: dailyTasks },
        { property: 'Weekly', count: weeklyTasks }
      ]
    }
  }

  async update(id: string, dto: UserDto) {
    let user = dto

    if (dto.password) {
      user = { ...dto, password: await hash(dto.password) }
    }

    return this.prisma.user.update({
      where: { id },
      data: user,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })
  }

  async remove(userId: string) {
    return this.prisma.user.delete({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    })
  }
}
