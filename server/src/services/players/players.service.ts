import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayersEntity } from 'src/entities/players/players.entity';
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
