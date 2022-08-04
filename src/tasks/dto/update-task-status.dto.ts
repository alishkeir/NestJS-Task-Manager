import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.module';

export class UpdateTaskStatusDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
