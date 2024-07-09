import { Controller, Get } from '@nestjs/common';
import { MatchupsService } from 'src/services/matchups/matchups.service';

@Controller()
export class MatchupsController {
  constructor(private readonly matchupsService: MatchupsService) {}

  @Get('matchups')
  get(): string {
    return 'matchups'
  }
}
