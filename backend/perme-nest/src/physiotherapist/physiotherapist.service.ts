import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePhysiotherapistDto } from './dto/create-physiotherapist.dto';
import { PhysiotherapistRepository } from './repositories/physiotherapist.repository';
import { UpdatePhysiotherapistDto } from './dto/update-physiotherapist.dto';
import { Physiotherapist } from './entities/physiotherapist.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PhysiotherapistService {
  constructor(
    private readonly physiotherapistRepository: PhysiotherapistRepository,
  ) {}

  async validatePassword(password: string, passwordConfirmation: string) {
    if (password != passwordConfirmation) {
      throw new BadRequestException(
        `O campo senha precisa ser igual ao campo de confirmação de senha`,
      );
    }

    const minLengthRegex = /.{6,20}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[\W_]/;
    const numberRegex = /\d/;

    if (!minLengthRegex.test(password)) {
      throw new BadRequestException(
        `A senha deve ter entre 6 e 20 caracteres.`,
      );
    }
    if (!uppercaseRegex.test(password)) {
      throw new BadRequestException(
        `A senha deve conter pelo menos uma letra maiúscula.`,
      );
    }
    if (!lowercaseRegex.test(password)) {
      throw new BadRequestException(
        `A senha deve conter pelo menos uma letra minúscula.`,
      );
    }
    if (!specialCharRegex.test(password)) {
      throw new BadRequestException(
        `A senha deve conter pelo menos um caractere especial.`,
      );
    }
    if (!numberRegex.test(password)) {
      throw new BadRequestException(
        `A senha deve conter pelo menos um número.`,
      );
    }

    return;
  }

  async getValidatedPhysiotherapist(
    identifier: string,
    password: string,
  ): Promise<Physiotherapist | null> {
    const physio =
      await this.physiotherapistRepository.findByIdentifier(identifier);
    if (!physio) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, physio.password);
    if (!isPasswordValid) {
      return null;
    }
    return physio;
  }

  async validateIdentifier(identifier: string) {
    const physiotherapist =
      await this.physiotherapistRepository.findByIdentifier(identifier);
    if (physiotherapist) {
      throw new UnprocessableEntityException(
        `Já existe um fisioterapeuta cadastrado com esta identificação`,
      );
    }

    const regex = /^\d{5}$/;

    if (!regex.test(identifier))
      throw new UnprocessableEntityException(
        `A identificação precisa ser composta apenas por números e deve conter 5 caracteres`,
      );

    return;
  }

  async create(data: CreatePhysiotherapistDto) {
    await this.validateIdentifier(data.identifier);
    await this.validatePassword(data.password, data.passwordConfirmation);

    return this.physiotherapistRepository.addPhysiotherapist(data);
  }

  async findAll() {
    return this.physiotherapistRepository.findAll();
  }

  async findOne(id: number) {
    const physiotherapist = await this.physiotherapistRepository.findById(id);
    if (!physiotherapist) {
      throw new NotFoundException('Fisioterapeuta não encontrado');
    }

    return physiotherapist;
  }

  async update(id: number, data: UpdatePhysiotherapistDto) {
    const physiotherapist = await this.findOne(id);
    if (physiotherapist.role === 'admin')
      throw new UnprocessableEntityException(
        'Não é possível atualizar os dados do administrador',
      );

    if (data.password) {
      await this.validatePassword(data.password, data.passwordConfirmation);
    }

    const physiotherapistUpdated =
      await this.physiotherapistRepository.updateOne(id, data);

    return physiotherapistUpdated;
  }

  async remove(id: number) {
    const physiotherapist = await this.findOne(id);
    if (physiotherapist.role === 'admin')
      throw new UnprocessableEntityException(
        'Não é possível remover um administrador',
      );

    return this.physiotherapistRepository.removeById(id);
  }
}
