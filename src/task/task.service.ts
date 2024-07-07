import { Injectable } from '@nestjs/common'

import { TaskDto } from './dto/task.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: TaskDto) {
    return this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: { id: userId }
        }
      }
    })
  }

  async getAll(userId: string) {
    return this.prisma.task.findMany({
      where: { userId }
    })
  }

  async getCompletedCount(userId: string) {
    return this.prisma.task.count({
      where: {
        userId,
        isCompleted: true
      }
    })
  }

  async getCountByDate(userId: string, date: Date) {
    return this.prisma.task.count({
      where: {
        userId,
        createdAt: {
          gte: date.toISOString()
        }
      }
    })
  }

  async update(id: string, userId: string, dto: Partial<TaskDto>) {
    return this.prisma.task.update({
      where: { id, userId },
      data: dto
    })
  }

  async remove(id: string, userId: string) {
    return this.prisma.task.delete({
      where: { id, userId }
    })
  }
}
