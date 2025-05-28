import { forwardRef, Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';

@Module({
  imports: [forwardRef(() => EnrollmentModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
