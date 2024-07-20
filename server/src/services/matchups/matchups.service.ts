import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchupsEntity } from 'src/entities/matchups.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchupsService {
  constructor(
    @InjectRepository(MatchupsEntity)
    private matchupsRepository: Repository<MatchupsEntity>,
  ) {}

  findAll(): Promise<MatchupsEntity[]> {
    return this.matchupsRepository.find();
  }

  findOneByPlayerId(id: number): Promise<MatchupsEntity[] | null> {
    return this.matchupsRepository.find({
      where: [{ player_id_1: id }, { player_id_2: id }],
    });
  }

  create(payload: any) {
    this.matchupsRepository.query('TRUNCATE matchups')
    return this.matchupsRepository.save(payload);
  }

  update(id: number, payload: any): any {
    return this.matchupsRepository.update(id, payload);
  }

}
