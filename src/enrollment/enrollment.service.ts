import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  async create(userId: string, courseId: string): Promise<Enrollment> {
    const enrollment = this.enrollmentRepository.create({
      user: { id: userId },
      course: { id: courseId },
      enrollmentDate: new Date(),
      status: Status.Active,
    });
    return this.enrollmentRepository.save(enrollment);
  }

  async findByUser(userId: string): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  }
}
