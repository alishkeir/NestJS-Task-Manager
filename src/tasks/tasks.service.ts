import { Task } from './task.module';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  getAllTasks(): Array<Task> {
    return this.tasks;
  }
}
