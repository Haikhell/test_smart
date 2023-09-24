import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SIXHOURS } from './constants/token.expiration';

export const jwtConfigFactory = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get('JWT_SECRET_DEV'),
    signOptions: {
      expiresIn: SIXHOURS,
    },
  };
};
