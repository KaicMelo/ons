import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayersService {
  get(): string {
    return 'Hello World!';
  }
}
