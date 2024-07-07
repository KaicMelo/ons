import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from '@services/players.service';
import { IPlayers } from '@shared/interfaces/players.interface';
import { InputFormComponent } from '@shared/components/input-form/input-form.component';
import { SocketService } from '@services/socket/socket.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  playersService: PlayersService = inject(PlayersService);
  socketService: SocketService = inject(SocketService);

  idToEdit!: string;
  name!: string;

  async ngOnInit(): Promise<void> {
    this.idToEdit = this.route.snapshot.paramMap.get('id') as string;
  }

  onSave(event: IPlayers) {
    if (this.idToEdit) {
      this.playersService.update(this.idToEdit, event).subscribe({
        next: (response) => {
          this.router.navigate(['players']);
          this.socketService.setPlayers('');
        },
        error: () => {},
      });

      return;
    }
    this.playersService.create(event).subscribe({
      next: () => {
        this.router.navigate(['players']);
        this.socketService.setPlayers('');
      },
      error: () => {},
    });
  }
}
