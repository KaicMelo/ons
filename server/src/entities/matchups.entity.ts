import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('matchups')
export class MatchupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player_id_1: number;

  @Column()
  player_id_2: number;

  @Column()
  value_1: number;

  @Column()
  value_2: number;
}
