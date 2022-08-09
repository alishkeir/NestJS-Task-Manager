import { User } from './../auth/user.entity';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
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
  UseGuards,
  Logger,
} from '@nestjs/common';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  private logger = new Logger('TasksController', true);
  constructor(private tasksService: TasksService) {}

  //* Get All Tasks
  @Get() // '/tasks'
  getTasks(
    @Query()
    filterDTO: GetTasksFilterDTO,
    @GetUser()
    user: User,
  ): Promise<Array<Task>> {
    //* if we have any filters defined, call taskService.GetAllTasksWithFilter
    //* otherwise, just get all tasks

    this.logger.verbose(
      `\nUser "${
        user.username
      }" is retrieving all tasks.\nFilters: ${JSON.stringify(filterDTO)} `,
    );

    try {
      return this.tasksService.getTasks(filterDTO, user);
    } catch (error) {
      this.logger.error(
        `Failed to get all tasks for User "${
          user.username
        }". \nFilter: ${JSON.stringify(filterDTO)}`,
        error.stack,
      );
    }
  }

  // //* Get a Task by ID
  @Get('/:id')
  getTaskByID(
    @Param('id')
    id: string,
    @GetUser()
    user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `\nUser "${user.username}" is retrieving task with id "${id}"`,
    );

    try {
      return this.tasksService.getTaskByID(id, user);
    } catch (error) {
      this.logger.error(
        `Failed to get task with id "${id}" for User "${user.username}".`,
        error.stack,
      );
    }
  }

  // //* Create a new Task
  @Post()
  createTask(
    @Body()
    createTaskDTO: CreateTaskDTO,
    @GetUser()
    user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `\nUser "${user.username}" is creating a task.\nData: ${JSON.stringify(
        createTaskDTO,
      )}`,
    );
    try {
      return this.tasksService.createTask(createTaskDTO, user);
    } catch (error) {
      this.logger.error(
        `Failed to create new task for User "${
          user.username
        }". \nFilter: ${JSON.stringify(createTaskDTO)}`,
        error.stack,
      );
    }
  }

  // //* Delete a Task by ID
  @Delete('/:id')
  deleteTask(
    @Param('id')
    id: string,
    @GetUser()
    user: User,
  ): Promise<void> {
    this.logger.verbose(
      `\nUser "${user.username}" is deleting task with id "${id}"
       `,
    );

    try {
      return this.tasksService.deleteTask(id, user);
    } catch (error) {
      this.logger.error(
        `Failed to delete task with id "${id}" for User "${user.username}".`,
        error.stack,
      );
    }
  }

  // //* Update a Task Status by ID
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
    @GetUser()
    user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `\nUser "${user.username}" is updating task with id "${id}"
      \n Data: ${JSON.stringify(updateTaskStatusDTO)}
       `,
    );
    const { status } = updateTaskStatusDTO;

    try {
      return this.tasksService.updateTask(id, status, user);
    } catch (error) {
      this.logger.error(
        `Failed to update task with id "${id}" for User "${
          user.username
        }".\nData: ${JSON.stringify(updateTaskStatusDTO)}`,
        error.stack,
      );
    }
  }
}
