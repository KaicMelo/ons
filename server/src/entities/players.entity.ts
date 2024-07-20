import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('players')
export class PlayersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  image: string;
}
