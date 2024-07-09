import { Controller, Get } from '@nestjs/common';
import { PlayersService } from 'src/services/players/players.service';

@Controller()
export class PlayersController {
  constructor(private readonly appService: PlayersService) {}

  @Get('players')
  get(): string {
    return 'teste'
    return this.appService.get();
  }
}
