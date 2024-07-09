import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatchupsService } from '@services/matchups/matchups.service';
import { PlayersService } from '@services/players.service';
import { SocketService } from '@services/socket/socket.service';
import { MatchupComponent } from '@shared/components/matchup/matchup.component';
import { IMatchups } from '@shared/interfaces/matchups.interface';
import { IPlayers } from '@shared/interfaces/players.interface';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [MatButtonModule, MatchupComponent, CommonModule],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent implements OnInit {
  playersService: PlayersService = inject(PlayersService);
  matchupsService: MatchupsService = inject(MatchupsService);
  socketService: SocketService = inject(SocketService);

  matchups: IMatchups[] = [];
  players: IPlayers[] = [];

  $matchupsService!: Observable<any[]>;
  $playersService!: Observable<any[]>;

  async ngOnInit(): Promise<void> {
    this.getTable();
  }

  async getTable() {
    this.$matchupsService = this.matchupsService.get();
    this.$playersService = this.playersService.get();

    this.players = await lastValueFrom(this.playersService.get());
  }

  async onCreateBracket() {
    const matchups = await this.generateBracket(this.players);

    if (matchups) {
      matchups.map((fn) => {
        lastValueFrom(this.matchupsService.setMatchups(fn));
      });
    }
  }

  async generateBracket(players: IPlayers[]) {
    const matchups = [];

    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        matchups.push({
          player1: {
            id: players[i].id,
            name: players[i].name,
            win: null,
            value: null,
          },
          player2: {
            id: players[j].id,
            name: players[j].name,
            win: null,
            value: null,
          },
        });
      }
    }

    return matchups as IMatchups[];
  }

  lineClass(index: number) {
    return index % 2 == 0 ? 'color1' : 'color2';
  }
}
