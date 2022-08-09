import { IsNotEmpty } from 'class-validator';

//* Data Transfer Object user to specify data type if it's being used in many places
//* Makes it easy to change data type in one place only
export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
