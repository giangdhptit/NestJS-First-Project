import { Course } from 'src/students/entities/course.entity';
import { Student } from 'src/students/entities/student.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Student, Course],
});
