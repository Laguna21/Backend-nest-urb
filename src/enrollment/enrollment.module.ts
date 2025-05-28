import { forwardRef, Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CourseModule } from 'src/course/course.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrollment]),
    forwardRef(() => CourseModule),
    forwardRef(() => UserModule),
  ],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
