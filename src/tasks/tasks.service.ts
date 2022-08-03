import { Task, TaskStatus } from './task.module';
import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  getAllTasks(): Array<Task> {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: UUID(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
