import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatchupsService } from '@services/matchups/matchups.service';
import { PlayersService } from '@services/players.service';
import { SocketService } from '@services/socket/socket.service';
import { IPlayers } from '@shared/interfaces/players.interface';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-points',
  standalone: true,
  imports: [NgFor, CommonModule,MatIconModule],
  templateUrl: './points.component.html',
  styleUrl: './points.component.less',
})
export class PointsComponent implements OnInit {
  matchupsService: MatchupsService = inject(MatchupsService);
  playersService: PlayersService = inject(PlayersService);
  socketService: SocketService = inject(SocketService);

  players: IPlayers[] = [];

  async ngOnInit(): Promise<void> {
    this.socketService.getPoints().subscribe((response) => {
      this.getTable();
    });
    this.getTable();
  }

  async getTable() {
    const pontuation = await lastValueFrom(this.matchupsService.get());

    this.players = await lastValueFrom(
      this.playersService.get().pipe(
        map((players: IPlayers[]): IPlayers[] => {
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
          players.sort((a: any, b: any) => b.points - a.points);
          return players;
        })
      )
    );
  }
  lineClass(index: number) {
    return index % 2 == 0 ? 'color1' : 'color2';
  }
}
