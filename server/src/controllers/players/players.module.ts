import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from 'src/services/players/players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersEntity } from 'src/entities/players/players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayersEntity])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
