import { Controller, Get } from '@nestjs/common';

@Controller()
export class PointsController {
  constructor() {}

  @Get('points')
  get(): string {
    return 'points'
  }
}
