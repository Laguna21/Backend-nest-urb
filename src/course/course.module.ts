import { forwardRef, Module } from '@nestjs/common';

import { ContentModule } from '../content/content.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';

@Module({
  imports: [
    forwardRef(() => ContentModule),
    forwardRef(() => EnrollmentModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
