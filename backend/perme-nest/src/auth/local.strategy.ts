import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Physiotherapist } from '../physiotherapist/entities/physiotherapist.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'identifier' });
  }

  async validate(
    identifier: string,
    password: string,
  ): Promise<Physiotherapist> {
    const physio = await this.authService.validateUser(identifier, password);
    if (!physio) {
      throw new UnauthorizedException();
    }
    return physio;
  }
}
