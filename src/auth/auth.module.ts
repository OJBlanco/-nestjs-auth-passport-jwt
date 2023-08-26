import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [UsersService],
  providers: [AuthService],
})
export class AuthModule {}
