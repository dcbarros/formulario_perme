import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { TrackableEntity } from '../../db/entities/trackable.entity';
import { Physiotherapist } from 'src/physiotherapist/entities/physiotherapist.entity';
import { Admission } from 'src/admission/entities/admission.entity';

@Entity()
export class Measurement extends TrackableEntity {

  @ManyToOne(() => Physiotherapist, (physiotherapist) => physiotherapist.measurements)
  physiotherapist: Physiotherapist;
  
  @Column()
  score: number;

  @Column()
  scoreTitle: string;

  @Column({ type: 'enum', enum: ['CTI', 'Enfermaria']})
  hospitalSector: 'CTI' | 'Enfermaria'

  @ManyToOne(() => Admission, (admission) => admission.measurements)
  admission: Admission;
}
