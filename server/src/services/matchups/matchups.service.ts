import { Injectable } from '@nestjs/common';

@Injectable()
export class MatchupsService {
  get(): string {
    return 'Hello World!';
  }
}
