import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { playersEntity } from './players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([playersEntity])],
  providers: [playersEntity],
})
export class playersEntityModule {}
