import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    EnrollmentModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtModule, JwtStrategy],
})
export class AuthModule {}
