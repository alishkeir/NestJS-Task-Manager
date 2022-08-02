import { TasksService } from './tasks.service';
import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get() // /tasks
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
}
