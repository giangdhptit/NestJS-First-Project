// grades/schemas/grade.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GradeDocument = Grade & Document;

@Schema()
export class Grade {
  @Prop({ required: true })
  studentId: number;

  @Prop({ required: true })
  courseId: number;

  @Prop({ required: true })
  grade: number;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);
