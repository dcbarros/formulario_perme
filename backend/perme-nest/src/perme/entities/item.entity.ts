import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TrackableEntity } from '../../db/entities/trackable.entity';
import { PermeCategory } from './category.entity';
import { PermeOption } from './option.entity';

@Entity()
export class PermeItem extends TrackableEntity {
  @ManyToOne(() => PermeCategory, (category) => category.items)
  category: PermeCategory;

  @Column()
  position: number;

  @Column()
  description: string;

  @OneToMany(() => PermeOption, (option) => option.item, { cascade: true })
  options: PermeOption[];
}
