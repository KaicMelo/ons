import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatchupsService } from '@services/matchups/matchups.service';
import { lastValueFrom, Observable } from 'rxjs';
import { IMatchups, IPlayer } from '@shared/interfaces/matchups.interface';
import { SocketService } from '@services/socket/socket.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { IPlayers } from '@shared/interfaces/players.interface';

@Component({
  selector: 'app-matchup',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
  ],
  templateUrl: './matchup.component.html',
  styleUrl: './matchup.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchupComponent implements OnInit {
  readonly panelOpenState = signal(false);
  formBuild: FormBuilder = inject(FormBuilder);
  @Input() setClass = '';
  @Input() inputmatchupsService!: IMatchups[];
  @Input() inputPlayersService!: IPlayers[];

  matchupsService: MatchupsService = inject(MatchupsService);
  socketService: SocketService = inject(SocketService);

  $matchupsService!: Observable<any[]>;

  matchupForm!: FormGroup;
  matchups:any[] = [];

  async ngOnInit(): Promise<void> {
    this.inputPlayersService.map((players: any) => {
      this.inputmatchupsService.map((matchups: IMatchups) => {
        if (
          players.id === matchups.player1.id ||
          players.id === matchups.player2.id
        ) {
          players.matchs = [matchups, matchups];
        }
      });
    });
  }

  async onSave(item: IMatchups, form: IForm) {
    if (form.result1 > form.result2) {
      item.player1.win = 1;
      item.player2.win = 0;
    } else {
      item.player1.win = 0;
      item.player2.win = 1;
    }

    item.player1.value = form.result1;
    item.player2.value = form.result2;

    await lastValueFrom(this.matchupsService.update(item.id, item));
    alert('Salvo com sucesso');

    this.socketService.setPoints('');
  }

  async onOpen(event: any){
    this.matchups = [];
    this.matchups = await lastValueFrom(this.matchupsService.getById(event));
  }
}

export interface IForm {
  result1: string;
  result2: string;
}
