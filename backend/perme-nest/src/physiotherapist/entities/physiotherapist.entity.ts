import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { TrackableEntity } from '../../db/entities/trackable.entity';
import * as bcryptjs from 'bcryptjs';
import { Measurement } from 'src/measurement/entities/measurement.entity';

@Entity()
export class Physiotherapist extends TrackableEntity {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  identifier: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'physio'], default: 'physio' })
  role: 'admin' | 'physio';

  @OneToMany(() => Measurement, (measurement) => measurement.physiotherapist, { cascade: true })
  measurements: Measurement[];

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
  }
}
