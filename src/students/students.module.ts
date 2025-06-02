import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Course } from './entities/course.entity';
import { Event } from 'src/events/event.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course, Event]), ConfigModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
