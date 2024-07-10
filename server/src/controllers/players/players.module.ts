import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from 'src/services/players/players.service';
import { playersEntityModule } from 'src/entities/players/players.module';

@Module({
  imports: [playersEntityModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
