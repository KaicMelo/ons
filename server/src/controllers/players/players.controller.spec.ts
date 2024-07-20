import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { PlayersService } from 'src/services/players/players.service';

describe('PlayersController', () => {
  let playersController: PlayersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [PlayersService],
    }).compile();

    playersController = app.get<PlayersController>(PlayersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const result = [{ id: 10203, name: 'Kaic', image: '45' }] as any;

      const responseMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await playersController.get(responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(responseMock.json).toHaveBeenCalledWith(result);
    });
  });
});
