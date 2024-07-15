import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

@Entity('players')
export class PlayersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @Length(1, 255)
  name: string;

  @Column({ length: 255 })
  @Length(0, 255)
  image: string;
}
