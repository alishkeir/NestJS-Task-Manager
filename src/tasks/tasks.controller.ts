import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.module';
import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get() // '/tasks'
  getAllTasks(): Array<Task> {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskByID(@Param('id') id: string): Task {
    return this.tasksService.getTaskByID(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}
