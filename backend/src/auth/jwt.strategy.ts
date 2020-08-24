import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthResolver } from "./auth.resolver";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authResolver: AuthResolver) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.authResolver.validateUser(payload.userId);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
