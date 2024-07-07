import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatchupsService } from '@services/matchups/matchups.service';
import { PlayersService } from '@services/players.service';
import { IPlayers } from '@shared/interfaces/players.interface';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-points',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './points.component.html',
  styleUrl: './points.component.less',
})
export class PointsComponent implements OnInit {
  matchupsService: MatchupsService = inject(MatchupsService);
  playersService: PlayersService = inject(PlayersService);

  players: IPlayers[] = [];

  async ngOnInit(): Promise<void> {
    const pontuation = await lastValueFrom(this.matchupsService.get());

    this.players = await lastValueFrom(
      this.playersService.get().pipe(
        map((players: any): any => {
          players.map((fn: IPlayers) => {
            let points = 0;

            pontuation.map((matchups) => {
              if (matchups.player1.id === fn.id) {
                if (matchups.player1.win) {
                  points++;
                }
              }
              if (matchups.player2.id === fn.id) {
                if (matchups.player2.win) {
                  points++;
                }
              }
            });
            fn.points = points;
          });
          return players;
        })
      )
    );
  }

  lineClass(index: number) {
    return index % 2 == 0 ? 'color1' : 'color2';
  }
}
