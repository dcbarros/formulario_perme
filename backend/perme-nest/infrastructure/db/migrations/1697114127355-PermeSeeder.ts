import { MigrationInterface, QueryRunner } from "typeorm"
import {PermeCategory} from '../../../src/perme/entities/category.entity';

export class PermeSeeder1697114127355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(
            queryRunner.manager.create<PermeCategory[]>(PermeCategory, [
                {
                    description: 'Estado Mental',
                    position: 0,
                    maxPoints: 3,
                    items: [
                        {
                            description: 'Estado de alerta no começo da avaliação',
                            position: 0,
                            options: [
                                {
                                    description: 'Não responsivo.',
                                    points: 0,
                                },
                                {
                                    description: 'Letárgico.',
                                    points: 1,
                                },
                                {
                                    description: 'Acordado e alerta.',
                                    points: 2,
                                },
                            ],
                        },
                        {
                            description: 'O paciente consegue seguir 2 entre 3 comandos?',
                            position: 1,
                            options: [
                                {
                                    description: 'Não.',
                                    points: 0,
                                },
                                {
                                    description: 'Sim.',
                                    points: 1,
                                },
                            ],
                        },
                    ],
                },
                {
                    description: 'Potenciais Barreiras à Mobilidade',
                    position: 1,
                    maxPoints: 4,
                    items: [
                        {
                            description: 'O paciente está em Ventilação Mecânica OU Ventilação Não-Invasiva?',
                            position: 0,
                            options: [
                                {
                                    description: 'Sim.',
                                    points: 0,
                                },
                                {
                                    description: 'Não.',
                                    points: 1,
                                },
                            ],
                        },
                        {
                            description: 'Dor',
                            position: 1,
                            options: [
                                {
                                    description: 'Incapaz de determinar dor ou o paciente indica sentir dor.',
                                    points: 0,
                                },
                                {
                                    description: 'Sem dor.',
                                    points: 1,
                                },
                            ],
                        },
                        {
                            description: 'O paciente apresenta 2 ou mais dos seguintes: Dispositivos de oxigenoterapia, Cateter de Foley, TOT, Traqueostomia, cateter central, cateter periférico, pressão arterial invasiva, cateter de diálise, CCIP, SGP, SJP, sonda nasogástrica, dreno de tórax,marcapasso temporário, cateter de artéria pulmonar, cateter epidural (PCA), BIA, DAVE, TSRC, ventriculostomia, dreno lombar, curativo a  vácuo para feridas (VAC), ou outros.',
                            position: 2,
                            options: [
                                {
                                    description: 'Sim.',
                                    points: 0,
                                },
                                {
                                    description: 'Não.',
                                    points: 1,
                                },
                            ],
                        },
                        {
                            description: 'O paciente está em infusão endovenosa? (infusão endovenosa            contínua: vasopressores, inotrópicos, insulina, antiarrítmicos, sedação, antibióticos, fluidos, reposição de eletrólitos, transfusão de sangue, etc)',
                            position: 3,
                            options: [
                                {
                                    description: 'Sim.',
                                    points: 0,
                                },
                                {
                                    description: 'Não.',
                                    points: 1,
                                },
                            ],
                        },
                    ],
                },
                {
                    description: 'Força Funcional',
                    position: 2,
                    maxPoints: 4,
                    items: [
                        {
                            description: 'Pernas',
                            position: 0,
                            options: [
                                {
                                    description: 'O paciente NÃO é capaz de erguer as pernas contra a gravidade por aproximadamente 20 graus, com o joelho estendido.',
                                    points: 0,
                                },
                                {
                                    description: 'O paciente é capaz de erguer UMA perna contra a gravidade por aproximadamente 20 graus, com o joelho estendido.',
                                    points: 1,
                                },
                                {
                                    description: 'O paciente é capaz de erguer DUAS pernas contra a gravidade por aproximadamente 20 graus, com o joelho estendido.',
                                    points: 2,
                                },
                            ],
                        },
                        {
                            description: 'Braços',
                            position: 1,
                            options: [
                                {
                                    description: 'O paciente NÃO é capaz de elevar os braços contra a gravidade por aproximadamente 45 graus, com o cotovelo estendido.',
                                    points: 0,
                                },
                                {
                                    description: 'O paciente é capaz de elevar UM braço contra a gravidade por aproximadamente 45 graus, com o cotovelo estendido.',
                                    points: 1,
                                },
                                {
                                    description: 'O paciente é capaz de elevar DOIS braços contra a gravidade por aproximadamente 45 graus, com o cotovelo estendido.',
                                    points: 2,
                                },
                            ],
                        },
                    ],
                },
                {
                    description: 'Mobilidade no Leito',
                    position: 3,
                    maxPoints: 6,
                    items: [
                        {
                            description: 'Solicita-se que o paciente passe da posição supina para sentado.',
                            position: 0,
                            options: [
                                {
                                    description: 'Não avaliado OU Assistência total (<25%)',
                                    points: 0,
                                },
                                {
                                    description: 'Máxima assistência (25 a 50%)',
                                    points: 1,
                                },
                                {
                                    description: 'Moderada assistência (50 a 75%)',
                                    points: 2,
                                },
                                {
                                    description: 'Mínima assistência (>75%) OU Supervisão',
                                    points: 3,
                                },
                            ],
                        },
                        {
                            description: 'Avaliar o equilíbrio estático em sedestação.',
                            position: 1,
                            options: [
                                {
                                    description: 'Não avaliado OU Assistência total (<25%)',
                                    points: 0,
                                },
                                {
                                    description: 'Máxima assistência (25 a 50%)',
                                    points: 1,
                                },
                                {
                                    description: 'Moderada assistência (50 a 75%)',
                                    points: 2,
                                },
                                {
                                    description: 'Mínima assistência (>75%) OU Supervisão',
                                    points: 3,
                                },
                            ],
                        },
                    ],
                },
                {
                    description: 'Transferências',
                    position: 4,
                    maxPoints: 9,
                    items: [
                        {
                            description: 'Sentado para em pé',
                            position: 0,
                            options: [
                                {
                                    description: 'Não avaliado OU Assistência total (<25%)',
                                    points: 0,
                                },
                                {
                                    description: 'Máxima assistência (25 a 50%)',
                                    points: 1,
                                },
                                {
                                    description: 'Moderada assistência (50 a 75%)',
                                    points: 2,
                                },
                                {
                                    description: 'Mínima assistência (>75%) OU Supervisão',
                                    points: 3,
                                },
                            ],
                        },
                        {
                            description: 'Equilíbrio estático uma vez estabelecida a posição em pé́',
                            position: 1,
                            options: [
                                {
                                    description: 'Não avaliado OU Assistência total (<25%)',
                                    points: 0,
                                },
                                {
                                    description: 'Máxima assistência (25 a 50%)',
                                    points: 1,
                                },
                                {
                                    description: 'Moderada assistência (50 a 75%)',
                                    points: 2,
                                },
                                {
                                    description: 'Mínima assistência (>75%) OU Supervisão',
                                    points: 3,
                                },
                            ],
                        },
                        {
                            description: 'Transferência do leito para a cadeira OU da cadeira para o leitó',
                            position: 1,
                            options: [
                                {
                                    description: 'Não avaliado OU Assistência total (<25%)',
                                    points: 0,
                                },
                                {
                                    description: 'Máxima assistência (25 a 50%)',
                                    points: 1,
                                },
                                {
                                    description: 'Moderada assistência (50 a 75%)',
                                    points: 2,
                                },
                                {
                                    description: 'Mínima assistência (>75%) OU Supervisão',
                                    points: 3,
                                },
                            ],
                        },
                    ],
                },
                {
                    description: 'Marcha',
                    position: 5,
                    maxPoints: 3,
                    items: [
                        {
                            description: 'Avaliar a sequência de movimento dos pés excluindo-se passos à beira do leito ou durante as transferências.',
                            position: 0,
                            options: [
                                {
                                    description: 'Não avaliado OU Assistência total (<25%)',
                                    points: 0,
                                },
                                {
                                    description: 'Máxima assistência (25 a 50%)',
                                    points: 1,
                                },
                                {
                                    description: 'Moderada assistência (50 a 75%)',
                                    points: 2,
                                },
                                {
                                    description: 'Mínima assistência (>75%) OU Supervisão',
                                    points: 3,
                                },
                            ],
                        },
                    ],
                },
                {
                    description: 'Endurance',
                    position: 6,
                    maxPoints: 3,
                    items: [
                        {
                            description: 'Distância percorrida em 2 minutos, independentemente do nível de assistência exigido, incluindo períodos de descanso (em pé ou sentado), com ou sem uso de dispositivo de auxílio.',
                            position: 0,
                            options: [
                                {
                                    description: 'Incapaz de deambular OU Não avaliado',
                                    points: 0,
                                },
                                {
                                    description: 'Distância percorrida entre 1 – 15 metros',
                                    points: 1,
                                },
                                {
                                    description: 'Distância percorrida entre 15 – 30 metros',
                                    points: 2,
                                },
                                {
                                    description: 'Distância percorrida ≥ 30 metros',
                                    points: 3,
                                },
                            ],
                        },
                    ],
                },
            ])
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('TRUNCATE TABLE perme_category RESTART IDENTITY CASCADE');
    }

}
