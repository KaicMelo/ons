import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchupsService } from '@services/matchups/matchups.service';
import { lastValueFrom, Observable } from 'rxjs';
import { SocketService } from '@services/socket/socket.service';
import { IPlayers } from '@shared/interfaces/players.interface';

@Component({
  selector: 'app-matchup',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './matchup.component.html',
  styleUrl: './matchup.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchupComponent implements OnInit {
  @Input() inputPlayersService!: IPlayers[];

  matchupsService: MatchupsService = inject(MatchupsService);
  socketService: SocketService = inject(SocketService);

  $matchupsService!: Observable<any[]>;

  matchups: any[] = [];

  expandedIndex: number | null = null;

  async ngOnInit(): Promise<void> {}

  async onSave(item: any) {
    const payload = {
      player_id_1: item.player_id_1,
      player_id_2: item.player_id_2,
      value_1: item.value_1,
      value_2: item.value_2,
    };

    await lastValueFrom(this.matchupsService.update(item.id, payload));
    alert('Salvo com sucesso');
    this.socketService.setPoints('');
  }

  async toggleExpand(index: number, id: any) {
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.$matchupsService = this.matchupsService.getById(id);
      this.expandedIndex = index;
    }
  }

  lineClass(index: number) {
    return index % 2 == 0 ? 'color1' : 'color2';
  }

  mathupsClass(index: any, selectedId: any) {
    if(index.value_1 === index.value_2){
      return 'equal'
    }

    if(index.player_id_1 === selectedId) {
      if(index.value_1 > index.value_2){
        return 'bigger'
      }
      if(index.value_1 < index.value_2){
        return 'smaller'
      }
    }

    if(index.player_id_2 === selectedId) {
      if(index.value_1 < index.value_2){
        return 'bigger'
      }
      if(index.value_1 > index.value_2){
        return 'smaller'
      }
    }

    return;
  }
}
