import { Injectable } from '@nestjs/common';
import { PhysiotherapistService } from '../physiotherapist/physiotherapist.service';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken, ITokenPayload } from './interfaces/auth.interface';
import { Physiotherapist } from '../physiotherapist/entities/physiotherapist.entity';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private physiotherapistService: PhysiotherapistService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    identifier: string,
    password: string,
  ): Promise<Physiotherapist | null> {
    return this.physiotherapistService.getValidatedPhysiotherapist(
      identifier,
      password,
    );
  }

  async findUserByTokenPayload(
    payload: ITokenPayload,
  ): Promise<Physiotherapist | null> {
    return this.physiotherapistService.findOne(payload.sub);
  }

  async login(physio: Physiotherapist): Promise<IAccessToken> {
    const payload = { identifier: physio.identifier, sub: physio.id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: this.configService.get('AUTH_TOKEN_EXPIRES_IN') ?? '9h' }),
    };
  }
}
