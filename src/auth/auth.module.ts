import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { UsersService } from '../users/services/users.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersService, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
