import { Module } from '@nestjs/common';
import { PlayersModule } from './controllers/players/players.module';
import { MatchupsModule } from './controllers/matchups/matchups.module';
import { PointsModule } from './controllers/points/points.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    PlayersModule,
    MatchupsModule,
    PointsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ons_db',
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
