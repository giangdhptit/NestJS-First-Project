import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  private students: Student[] = [
    {
      id: 1,
      name: 'John',
      promotion: 'Spring',
      courses: ['JS', 'Java'],
    },
  ];

  findAll() {
    return this.students;
  }

  findOne(id: string) {
    return this.students.find((item) => item.id === +id);
  }

  create(createStudentDto: CreateStudentDto) {
    this.students.push(createStudentDto);
    return createStudentDto;
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    const existingStudent = this.findOne(id);
    if (existingStudent) {
      // update ...
    }
  }

  remove(id: string) {
    const studentIndex = this.students.findIndex((item) => item.id === +id);
    if (studentIndex >= 0) {
      this.students.splice(studentIndex, 1);
    }
  }
}
