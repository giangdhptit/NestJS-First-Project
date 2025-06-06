import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grade, GradeDocument } from './entities/grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade.name)
    private readonly gradeModel: Model<GradeDocument>,
    private readonly configService: ConfigService,
  ) {
    const mongoHost = this.configService.get<string>('MONGO_HOST');
    console.log(`Connected to MongoDB at ${mongoHost}`);
  }

  async findAll(): Promise<Grade[]> {
    return this.gradeModel.find().exec();
  }

  async findOne(id: string): Promise<Grade> {
    const grade = await this.gradeModel.findById(id).exec();
    if (!grade) {
      throw new NotFoundException(`Grade #${id} not found`);
    }
    return grade;
  }

  async create(createGradeDto: CreateGradeDto): Promise<Grade> {
    const newGrade = new this.gradeModel(createGradeDto);
    return newGrade.save();
  }

  async update(id: string, updateGradeDto: UpdateGradeDto): Promise<Grade> {
    const updatedGrade = await this.gradeModel
      .findByIdAndUpdate(id, updateGradeDto, { new: true })
      .exec();

    if (!updatedGrade) {
      throw new NotFoundException(`Grade #${id} not found`);
    }

    return updatedGrade;
  }

async remove(id: string): Promise<Grade> {
  const deleted = await this.gradeModel.findByIdAndDelete(id).exec();
  if (!deleted) {
    throw new NotFoundException(`Grade #${id} not found`);
  }
  return deleted;
}

}
