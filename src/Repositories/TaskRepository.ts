import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from "@prisma/client";

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async saveTask(data: Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput> | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>): Promise<Task> {
    if (!data.id) {
      return this.prisma.task.create({
        data: data as Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      });
    }

    return this.prisma.task.update({
      where: { id: data.id as number },
      data: data as Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>
    });
  }
}
