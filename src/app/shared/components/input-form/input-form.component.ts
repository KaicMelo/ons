import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '@services/players.service';
import { IPlayers } from '@shared/interfaces/players.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [MatButton, FormsModule, ReactiveFormsModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.less',
})
export class InputFormComponent implements OnInit {
  @Output() outputName = new EventEmitter<IPlayers>();

  route: ActivatedRoute = inject(ActivatedRoute);
  playersService: PlayersService = inject(PlayersService);

  constructor() {
    this.registerForm = this.formBuild.group({
      name: new FormControl(''),
      image: new FormControl('https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg'),
    });
  }

  formBuild: FormBuilder = inject(FormBuilder);
  registerForm!: FormGroup;

  async ngOnInit(): Promise<void> {
    const idToEdit = this.route.snapshot.paramMap.get('id') as string;

    if (idToEdit) {
      const response = await lastValueFrom(
        this.playersService.getById(idToEdit)
      );

      this.registerForm.patchValue({
        name: response.name,
        image: response.image,
      });
    }
  }

  onSave(value: IPlayers) {
    if (this.registerForm.valid) {
      this.outputName.emit(value);
    }
  }
}
