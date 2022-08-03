import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.module';
import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  getAllTasks(): Array<Task> {
    return this.tasks;
  }

  getTaskByID(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: UUID(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    const indexOfTask = this.tasks.findIndex((object) => {
      return object.id == id;
    });

    this.tasks.splice(indexOfTask, 1);
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskByID(id);
    task.status = status;

    return task;
  }
}
