import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  Put,
  Body,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { PlayersEntity } from 'src/entities/players.entity';
import { PlayersService } from 'src/services/players/players.service';
import { Response } from 'express';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersEntity: PlayersService) {}

  @Get()
  async get(@Res() response: Response): Promise<any> {
    const res = await this.playersEntity.findAll();
    if (res) return response.status(HttpStatus.OK).json(res);
    else return response.status(HttpStatus.NOT_FOUND).json([]);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<any> {
    const res = await this.playersEntity.findOne(id);

    if (res) return response.status(HttpStatus.OK).json(res);
    else return response.status(HttpStatus.NOT_FOUND).json([]);
  }

  @Post()
  async create(@Body() request: PlayersEntity, @Res() response: Response) {
    const res = await this.playersEntity.create(request);

    return response.status(HttpStatus.CREATED).json(res);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() request: PlayersEntity,
    @Res() response: Response,
  ) {
    const res = await this.playersEntity.update(id, request);

    if (res.affected)
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Atualizado com sucesso' });
    else
      return response
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'houve um erro ao atualizar' });
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() response: Response) {
    const res = await this.playersEntity.delete(id);

    if (res.affected)
      return response
        .status(HttpStatus.OK)
        .json({ message: 'Deletado com sucesso' });
    else
      return response
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Registro não encontrado' });
  }
}
