import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';

@Module({
  imports: [],
  controllers: [PointsController],
  providers: [],
})
export class PointsModule {}
