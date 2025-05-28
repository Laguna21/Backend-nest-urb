import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

import { Exclude, Type } from 'class-transformer';
import { Role } from 'src/enums/role.enum';

class CourseResponse {
  id: string;
  name: string;
  description: string;
}

class EnrollmentResponse {
  id: string;
  enrollmentDate: Date;
  status: string;

  @Type(() => CourseResponse)
  course: CourseResponse;
}

@Exclude()
export class UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: Role;

  @Type(() => EnrollmentResponse)
  enrollments: EnrollmentResponse[];

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.role = user.role;

    this.enrollments =
      user.enrollments?.map((enrollment) => {
        const er = new EnrollmentResponse();
        er.id = enrollment.id;
        er.enrollmentDate = enrollment.enrollmentDate;
        er.status = enrollment.status;

        if (enrollment.course) {
          er.course = {
            id: enrollment.course.id,
            name: enrollment.course.name,
            description: enrollment.course.description,
          };
        }

        return er;
      }) || [];
  }
}

export class LoginResponseDto {
  token: string;

  @Type(() => UserResponse)
  user: UserResponse;
}
