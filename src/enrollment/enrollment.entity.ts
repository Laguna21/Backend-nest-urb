import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { Status } from 'src/enums/status.enum';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.enrollments)
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrollmentDate: Date;

  @Column({ type: 'enum', enum: Status, default: Status.Active })
  status: Status; // 'active', 'completed', 'cancelled'
}
