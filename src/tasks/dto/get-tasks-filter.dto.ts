import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './../task.module';
export class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
