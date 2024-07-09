import { Controller, Get } from '@nestjs/common';
import { MatchupsService } from 'src/services/matchups/matchups.service';

@Controller()
export class PointsController {
  constructor(private readonly matchupsService: MatchupsService) {}

  @Get('points')
  get(): string {
    return 'points'
  }
}
