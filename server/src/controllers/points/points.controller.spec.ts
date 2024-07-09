import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from 'src/services/players/players.service';
import { PointsController } from './points.controller';

describe('PointsController', () => {
  let pointsController: PointsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PointsController],
      providers: [PlayersService],
    }).compile();

    pointsController = app.get<PointsController>(PointsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pointsController.get()).toBe('Hello World!');
    });
  });
});
