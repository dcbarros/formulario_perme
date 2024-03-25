import { Column, Entity, OneToMany } from 'typeorm';
import { TrackableEntity } from '../../db/entities/trackable.entity';
import { PermeItem } from './item.entity';

@Entity()
export class PermeCategory extends TrackableEntity {
  @Column()
  position: number;

  @Column()
  maxPoints: number;

  @Column()
  description: string;

  @OneToMany(() => PermeItem, (item) => item.category, { cascade: true })
  items: PermeItem[];
}
