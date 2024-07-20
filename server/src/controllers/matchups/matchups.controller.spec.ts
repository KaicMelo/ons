import { Test, TestingModule } from '@nestjs/testing';
import { MatchupsController } from './matchups.controller';
import { MatchupsService } from 'src/services/matchups/matchups.service';

describe('AppController', () => {
  let matchupsService: MatchupsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MatchupsController],
      providers: [MatchupsService],
    }).compile();

    matchupsService = app.get<MatchupsController>(MatchupsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(matchupsService.get()).toBe('Hello World!');
    });
  });
});
