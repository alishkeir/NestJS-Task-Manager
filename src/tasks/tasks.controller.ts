import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.module';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  //* Get All Tasks
  @Get() // '/tasks'
  getTasks(@Query() filterDTO: GetTasksFilterDTO): Array<Task> {
    //* if we have any filters defined, call taskService.GetAllTasksWithFilter
    //* otherwise, just get all tasks

    if (Object.keys(filterDTO).length) {
      return this.tasksService.GetTasksWithFilter(filterDTO);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  //* Get a Task by ID
  @Get('/:id')
  getTaskByID(@Param('id') id: string): Task {
    return this.tasksService.getTaskByID(id);
  }

  //* Create a new Task
  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }

  //* Delete a Task by ID
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  //* Update a Task Status by ID
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Task {
    const { status } = updateTaskStatusDTO;
    return this.tasksService.updateTask(id, status);
  }
}
