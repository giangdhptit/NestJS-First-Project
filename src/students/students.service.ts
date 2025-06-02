import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.studentRepository.find(); // SELECT * FROM students;
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!student) {
      throw new NotFoundException(`Student #${id} not found`);
    }
    return student;
  }

  async create(createStudentDto: CreateStudentDto) {
    const courses = await Promise.all(
      createStudentDto.courses.map((name) => this.preloadCourseByName(name)),
    );
    const student = this.studentRepository.create({
      ...createStudentDto,
      courses,
    });
    return this.studentRepository.save(student);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const courses =
      updateStudentDto.courses &&
      (await Promise.all(
        updateStudentDto.courses.map((name) => this.preloadCourseByName(name)),
      ));
    const student = await this.studentRepository.preload({
      id: +id,
      ...updateStudentDto,
      courses,
    });
    if (!student) {
      throw new NotFoundException(`Student #${id} not found`);
    }
    return this.studentRepository.save(student);
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    return this.studentRepository.remove(student);
  }

  private async preloadCourseByName(name: string): Promise<Course> {
    const existingCourse = await this.courseRepository.findOne({
      where: { name },
    });
    if (existingCourse) {
      return existingCourse;
    }
    return this.courseRepository.create({ name });
  }
}
