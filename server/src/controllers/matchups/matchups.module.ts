import { Module } from '@nestjs/common';
import { MatchupsController } from './matchups.controller';
import { MatchupsService } from 'src/services/matchups/matchups.service';
import { MatchupsEntity } from 'src/entities/matchups.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersEntity } from 'src/entities/players.entity';
import { PlayersService } from 'src/services/players/players.service';

@Module({
  imports: [TypeOrmModule.forFeature([MatchupsEntity, PlayersEntity])],
  controllers: [MatchupsController],
  providers: [MatchupsService, PlayersService],
})
export class MatchupsModule {}
