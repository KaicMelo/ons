import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PlayersService } from '../../services/players.service';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IPlayers } from '@shared/interfaces/players.interface';
import { SocketService } from '@services/socket/socket.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersComponent implements OnInit {
  myControl = new FormControl('');
  router: Router = inject(Router);

  playersService: PlayersService = inject(PlayersService);
  socketService: SocketService = inject(SocketService);

  $playersService!: Observable<IPlayers[]>;
  filteredOptions!: Observable<IPlayers[]>;
  players: IPlayers[] = [];
  filteredPeople: IPlayers[] = [];

  async ngOnInit(): Promise<void> {
    this.$playersService = this.playersService.get();

    this.socketService.getPlayers().subscribe((response) => {
      this.getPlayers();
    });
    this.getPlayers();
  }

  async getPlayers() {
    this.players = await lastValueFrom(this.$playersService);
    this.filteredPeople = this.players;
  }

  onAdd() {
    this.router.navigate(['players/register']);
  }

  onEdit(event: IPlayers) {
    this.router.navigate([`players/register/${event.id}`]);
  }

  search() {
    const form: string = this.myControl.getRawValue() as string;

    this.filteredPeople = this.players.filter((person: IPlayers) =>
      person.name.toLowerCase().includes(form.toLowerCase())
    );
  }
}
