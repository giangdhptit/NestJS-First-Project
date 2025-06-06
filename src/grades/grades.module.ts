import { Module } from '@nestjs/common';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Grade, GradeSchema } from './entities/grade.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grade.name, schema: GradeSchema }]),
    ConfigModule,
  ],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
