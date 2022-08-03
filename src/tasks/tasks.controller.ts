import { Task } from './task.module';
import { TasksService } from './tasks.service';
import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get() // '/tasks'
  getAllTasks(): Array<Task> {
    return this.tasksService.getAllTasks();
  }

  
}
