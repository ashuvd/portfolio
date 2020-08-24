import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10s' },
    }),
  ],
  providers: [AuthResolver, JwtStrategy],
  exports: [AuthResolver],
})
export class AuthModule {}
