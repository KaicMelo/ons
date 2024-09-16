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

  players: IPlayers[] = [];
  $playersService!: Observable<any[]>;

  async ngOnInit(): Promise<void> {
    this.getTable();
  }

  async getTable() {
    this.$playersService = this.playersService.get();
    this.players = await lastValueFrom(this.$playersService);
  }

  async onCreateBracket() {
    if (!confirm('Deseja resetar a bracket ?')) {
      return;
    }
    await lastValueFrom(this.matchupsService.generateBracket(this.players));
  }
}
