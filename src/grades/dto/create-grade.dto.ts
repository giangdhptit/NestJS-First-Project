import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { IsInt} from 'class-validator';


export class CreateGradeDto {
  @Expose()
  @IsInt()
  studentId: number;

  @Expose()
  @IsInt()
  courseId: number;

  @Expose()
  @IsInt()
  grade: number;

}
