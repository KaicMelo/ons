import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayersService {
  get(): any {
    return 'Hello World!';
  }
}
