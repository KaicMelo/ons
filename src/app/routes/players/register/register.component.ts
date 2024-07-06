import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from '@services/players.service';
import { lastValueFrom } from 'rxjs';
import { IPlayers } from '@shared/interfaces/players.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButton,
    MatTooltip,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  formBuild: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  playersService: PlayersService = inject(PlayersService);

  registerForm!: FormGroup;
  idToEdit!: string;

  async ngOnInit(): Promise<void> {
    this.idToEdit = this.route.snapshot.paramMap.get('id') as string;

    if (this.idToEdit) {
      const response: IPlayers = await lastValueFrom(
        this.playersService.getById(this.idToEdit)
      );
      this.registerForm = this.formBuild.group({
        name: new FormControl(response.name),
      });
    } else {
      this.registerForm = this.formBuild.group({
        name: new FormControl(''),
      });
    }
  }

  onSave(event: IPlayers) {
    if (this.registerForm.valid) {
      if (this.idToEdit) {
        const payload:IPlayers  = {
          name: event.name,
          image: event?.image
            ? event?.image
            : 'https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg',
        };

        this.playersService.update(this.idToEdit, payload).subscribe({
          next: (response) => {
            this.router.navigate(['players']);
          },
          error: () => {},
        });

        return;
      }
      const payload:IPlayers = {
        name: event.name,
        image: event?.image
          ? event?.image
          : 'https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg',
      };
      this.playersService.create(payload).subscribe({
        next: () => {
          this.router.navigate(['players']);
        },
        error: () => {},
      });
    }
  }
}
