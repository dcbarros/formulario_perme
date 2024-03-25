import { Column, Entity, ManyToOne } from 'typeorm';
import { TrackableEntity } from '../../db/entities/trackable.entity';
import { PermeItem } from './item.entity';

@Entity()
export class PermeOption extends TrackableEntity {
  @ManyToOne(() => PermeItem, (item) => item.options)
  item: PermeItem;

  @Column()
  description: string;

  @Column()
  points: number;
}
