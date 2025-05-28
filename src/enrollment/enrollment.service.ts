import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
        status: Status.Active,
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('El usuario ya está inscrito en este curso');
    }

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

  async updateEnrollmentStatus(
    enrollmentId: string,
    newStatus: Status,
  ): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      throw new NotFoundException('Inscripción no encontrada');
    }

    enrollment.status = newStatus;
    return this.enrollmentRepository.save(enrollment);
  }

  async deleteEnrollment(enrollmentId: string): Promise<void> {
    const result = await this.enrollmentRepository.delete(enrollmentId);

    if (result.affected === 0) {
      throw new NotFoundException('Inscripción no encontrada');
    }
  }
}
