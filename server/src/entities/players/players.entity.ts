import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'players' })
export class playersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
