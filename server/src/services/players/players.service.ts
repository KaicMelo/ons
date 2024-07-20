import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayersEntity } from 'src/entities/players.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(PlayersEntity)
    private playersRepository: Repository<PlayersEntity>,
  ) {}

  findAll(): Promise<PlayersEntity[]> {
    return this.playersRepository.find();
  }

  create(payload: any) {
    if (!payload.image) {
      payload.image =
        'https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg';
    }
    return this.playersRepository.save(payload);
  }

  findOne(id: number): Promise<PlayersEntity | null> {
    return this.playersRepository.findOneBy({ id });
  }

  delete(id: number): Promise<any> {
    return this.playersRepository.delete(id);
  }

  update(id: number, payload: any): any {
    return this.playersRepository.update(id, payload);
  }
}
