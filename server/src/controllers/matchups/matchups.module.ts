import { Module } from '@nestjs/common';
import { MatchupsController } from './matchups.controller';
import { MatchupsService } from 'src/services/matchups/matchups.service';

@Module({
  imports: [],
  controllers: [MatchupsController],
  providers: [MatchupsService],
})
export class MatchupsModule {}
