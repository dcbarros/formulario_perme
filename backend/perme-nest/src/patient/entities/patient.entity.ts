import { Column, Entity, OneToMany } from 'typeorm';
import { TrackableEntity } from '../../db/entities/trackable.entity';
import { Measurement } from 'src/measurement/entities/measurement.entity';
import { Admission } from 'src/admission/entities/admission.entity';

@Entity()
export class Patient extends TrackableEntity {
  @Column()
  fullName: string;

  @Column({ unique: true })
  internalCode: string;

  @Column()
  entryDate: Date;

  @OneToMany(() => Admission, (admission) => admission.patient, { cascade: true })
  admissions: Admission[];

  // @OneToMany(() => Measurement, (measurement) => measurement.patient, { cascade: true })
  // measurements: Measurement[];
}
