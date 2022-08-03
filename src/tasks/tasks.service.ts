import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.module';
import { Injectable } from '@nestjs/common';
import { v4 as UUID } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  //* Get All Tasks
  getAllTasks(): Array<Task> {
    return this.tasks;
  }

  //* Get a Task by ID
  getTaskByID(id: string): Task {
    return this.tasks.find((task) => task.id == id);
  }

  //* Create a new Task
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

  //* Delete a Task by ID
  deleteTask(id: string): void {
    const indexOfTask = this.tasks.findIndex((object) => {
      return object.id == id;
    });

    this.tasks.splice(indexOfTask, 1);
  }

  //* Update a Task Status by ID
  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskByID(id);
    task.status = status;

    return task;
  }

  GetTasksWithFilter(filterDTO: GetTasksFilterDTO): Array<Task> {
    const { status, search } = filterDTO;

    let tasks = this.getAllTasks();

    //* do something with status

    if (status) {
      tasks = tasks.filter((task) => task.status == status);
    }

    //* do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });
    }

    return tasks;
  }
}
