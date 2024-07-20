import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
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

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() request: PlayersEntity,
    @Res() response: Response,
  ) {
    const res = await this.matchupsService.update(id, request);

    if (res.affected)
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Atualizado com sucesso' });
    else
      return response
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'houve um erro ao atualizar' });
  }

  @Post('generate')
  async create(@Body() request: PlayersEntity[], @Res() response: Response) {
    const payload = [];

    for (let i = 0; i < request.length; i++) {
      for (let j = i + 1; j < request.length; j++) {
        payload.push({
          player_id_1: request[i].id,
          player_id_2: request[j].id,
          value_1: 0,
          value_2: 0,
        });
      }
    }
    
    const res = await this.matchupsService.create(payload);

    return response.status(HttpStatus.CREATED).json(res);
  }
}
