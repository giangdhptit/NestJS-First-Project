import { StudentRefactor1748883610123 } from 'src/migrations/1748883610123-StudentRefactor';
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
  migrations: [StudentRefactor1748883610123],
});

/**
 * to create a migration
 *
 * npx typeorm migration:create src/migrations/StudentRefactor
 */

/**
 * REMEBER
 * you need to build your code first before running a migration
 *
 * RUNNING A MIGRATION:
 * npx typeorm migration:run -d dist/typeorm-cli.config
 *
 * REVERTING A MIGRATION
 * npx typeorm migration:revert -d dist/typeorm-cli.config
 */

/**
 * We can let typeorm generate migrations for us
 * npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config
 */
