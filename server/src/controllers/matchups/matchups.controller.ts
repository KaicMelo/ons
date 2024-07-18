import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { MatchupsService } from 'src/services/matchups/matchups.service';
import { Response } from 'express';
import { PlayersService } from 'src/services/players/players.service';
import { PlayersEntity } from 'src/entities/players.entity';

@Controller('matchups')
export class MatchupsController {
  players: PlayersEntity[];

  constructor(
    private readonly matchupsService: MatchupsService,
    private readonly playersEntity: PlayersService,
  ) {}

  @Get()
  async get(@Res() response: Response): Promise<any> {
    this.players = await this.playersEntity.findAll();

    const res = await this.matchupsService.findAll();

    const resp = [];

    res.map((fn) => {
      resp.push({
        id: fn.id,
        player1: {
          id: fn.player_id_1,
          name: this.players.filter((it) => it.id === fn.player_id_1)[0].name,
          win: fn.value_1 > fn.value_2,
          value: fn.value_1,
        },
        player2: {
          id: fn.player_id_2,
          name: this.players.filter((it) => it.id === fn.player_id_2)[0].name,
          win: fn.value_2 > fn.value_1,
          value: fn.value_2,
        },
      });
    });

    if (res) return response.status(HttpStatus.OK).json(resp);
    else return response.status(HttpStatus.NOT_FOUND).json([]);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<any> {
    this.players = await this.playersEntity.findAll();

    const res = await this.matchupsService.findOneByPlayerId(id);
    const resp = [];

    res.map((fn) => {
      resp.push({
        ...fn,
        name_1: this.players.filter((it) => it.id === fn.player_id_1)[0].name,
        image_1: this.players.filter((it) => it.id === fn.player_id_1)[0].image,
        name_2: this.players.filter((it) => it.id === fn.player_id_2)[0].name,
        image_2: this.players.filter((it) => it.id === fn.player_id_2)[0].image,
      });
    });
    if (res) return response.status(HttpStatus.OK).json(resp);
    else return response.status(HttpStatus.NOT_FOUND).json([]);
  }
}
