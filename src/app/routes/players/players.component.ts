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
  options: string[] = ['One', 'Two', 'Three'];
  router: Router = inject(Router);
  playersService: PlayersService = inject(PlayersService);
  $playersService!: Observable<any>;
  filteredOptions!: Observable<any>;
  players: any;
  filteredPeople: any

  async ngOnInit(): Promise<void> {
    this.$playersService = this.playersService.get();
    this.players = await lastValueFrom(this.$playersService);
    this.filteredPeople = this.players;

  }

  onAdd() {
    this.router.navigate(['players/register']);
  }

  teste() {
    const name:any = this.myControl.getRawValue();

    this.filteredPeople = this.players.filter((person: any) =>
      person.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}
