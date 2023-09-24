import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadCreate } from '../interfaces/payload.create. class';
import { PayloadValidate } from '../interfaces/payload.validate.class';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_DEV'),
    });
  }

  async validate(payload: PayloadCreate): Promise<PayloadValidate> {
    return { user: payload.user };
  }
}
