import { ForbiddenException, Injectable } from "@nestjs/common";
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import { Task } from "@prisma/client";
import TaskRepository from "../../Repositories/TaskRepository";


@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    try {
      const savedTask = await this.taskRepository.saveTask({
        ...(dto.id ? { id: dto.id } : {}),
        name: dto.name,

      });

      return savedTask;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
