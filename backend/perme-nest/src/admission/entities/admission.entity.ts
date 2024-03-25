import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TrackableEntity } from '../../db/entities/trackable.entity';
import { Patient } from '../../patient/entities/patient.entity';
import { Measurement } from '../../measurement/entities/measurement.entity';

@Entity()
export class Admission extends TrackableEntity {
  @Column()
  admittedAt: Date;

  @Column({nullable: true})
  dischargedAt: Date;

  @Column({nullable: true})
  observation: string;

  @Column({ type: 'enum', enum: ['Alta da fisioterapia', 'Alta hospitalar'], nullable: true})
  dischargedType: 'Alta da fisioterapia' | 'Alta hospitalar';

  @ManyToOne(() => Patient, (patient) => patient.admissions)
  patient: Patient;

  @OneToMany(() => Measurement, (measurement) => measurement.admission, { cascade: true })
  measurements: Measurement[];
}
