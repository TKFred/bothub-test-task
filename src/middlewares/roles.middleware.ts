import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@services/user/user.service';
import { HttpMethod } from 'src/enums/http-method.enum';
import { User } from '@entities/user.entity';

@Injectable()
export class RolesMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    let decoded: any, user: User;

    try {
      decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      user = await this.userService.findOneById(decoded.userId);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!this.hasRequiredRole(user.roles, req.method)) {
      throw new ForbiddenException('Insufficient permissions');
    }

    req.user = user;
    console.log(req.user);
    next();
  }

  private hasRequiredRole(userRoles: number, method: string): boolean {
    switch (method) {
      case HttpMethod.GET: return (userRoles & (1 << 0)) !== 0;
      case HttpMethod.PUT: return (userRoles & (1 << 1)) !== 0;
      case HttpMethod.POST: return (userRoles & (1 << 2)) !== 0;
      case HttpMethod.DELETE: return (userRoles & (1 << 3)) !== 0;
    }
    return false;
  }
}