import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { MatchupsService } from 'src/services/matchups/matchups.service';

@Module({
  imports: [],
  controllers: [PointsController],
  providers: [MatchupsService],
})
export class PointsModule {}
