import { Resolver, Args, Query } from '@nestjs/graphql'
import { Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import User from '../models/User';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { GqlAuthGuard } from "./jwt-auth.guard";
import { CurrentUser } from "../decorators/current.user.decorator";
import * as jwt from 'jsonwebtoken';

type Auth = {
  user: {
    id: number,
    login: string,
  },
  accessToken: string,
  refreshToken: string
}

type Info = {
  user: {
    id: number,
    login: string,
  },
}

@Resolver(of => User)
export class AuthResolver {
  constructor(@Inject('USER_REPOSITORY') private readonly userRepository: typeof User, private jwtService: JwtService) {
  }
  async authUser(login: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      return null;
    }
    const compare = await user.comparePasswords(pass);
    if (!compare) {
      return null;
    }
    return user;
  }
  async validateUser(userId: number): Promise<any> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  @Query(returns => User)
  async login(@Args('login') login: string, @Args('password') password: string): Promise<Auth> {
    const user = await this.authUser(login, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const [session] = await user.getSessions();
    if (session) {
      await session.destroy();
    }
    const payload = { userId: user.id };
    const refreshToken = uuid();
    await user.createSession({
      refresh_token: refreshToken
    })
    return {
      user: {
        id: user.id,
        login: user.login
      },
      accessToken: this.jwtService.sign(payload),
      refreshToken
    };
  }

  @Query(returns => User)
  async refresh(@Args('accessToken') accessToken: string, @Args('refreshToken') refreshToken: string): Promise<Auth> {
    const decoded: any = jwt.decode(accessToken, { complete: true });
    const userId = decoded ? decoded.payload.userId : 0;

    const user: any = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new UnauthorizedException();
    }
    const [session] = await user.getSessions();
    if (session.refresh_token !== refreshToken) {
      throw new UnauthorizedException();
    }
    await session.destroy();
    const payload = { userId: user.id };
    const newRefreshToken = uuid();
    await user.createSession({
      refresh_token: newRefreshToken
    })
    return {
      user: {
        id: user.id,
        login: user.login
      },
      accessToken: this.jwtService.sign(payload),
      refreshToken: newRefreshToken
    };
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => User)
  async info(@CurrentUser() user: User): Promise<Info> {
    return {
      user: {
        id: user.id,
        login: user.login
      },
    };
  }
}
