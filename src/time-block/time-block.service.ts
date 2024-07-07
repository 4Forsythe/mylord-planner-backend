import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { TimeBlockDto } from './dto/time-block.dto'

@Injectable()
export class TimeBlockService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: TimeBlockDto) {
    return this.prisma.timeBlock.create({
      data: {
        ...dto,
        user: {
          connect: { id: userId }
        }
      }
    })
  }

  async getAll(userId: string) {
    return this.prisma.timeBlock.findMany({
      where: { userId },
      orderBy: { order: 'asc' }
    })
  }

  async updateOrder(ids: string[]) {
    return this.prisma.$transaction(
      ids.map((id, index) =>
        this.prisma.timeBlock.update({
          where: { id },
          data: { order: index }
        })
      )
    )
  }

  async update(id: string, userId: string, dto: Partial<TimeBlockDto>) {
    return this.prisma.timeBlock.update({
      where: { id, userId },
      data: dto
    })
  }

  async remove(id: string, userId: string) {
    return this.prisma.timeBlock.delete({
      where: { id, userId }
    })
  }
}
