import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
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
import { IMatchups } from '@shared/interfaces/matchups.interface';

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
  ],
  templateUrl: './matchup.component.html',
  styleUrl: './matchup.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchupComponent implements OnInit {
  formBuild: FormBuilder = inject(FormBuilder);
  @Input() setClass = '';
  @Input() item!: IMatchups;
  matchupsService: MatchupsService = inject(MatchupsService);

  $matchupsService!: Observable<any[]>;

  matchupForm!: FormGroup;

  async ngOnInit(): Promise<void> {
    this.matchupForm = this.formBuild.group({
      result1: new FormControl(this.item.player1.value, [Validators.required]),
      result2: new FormControl(this.item.player2.value, [Validators.required]),
    });
  }

  onSave(item: IMatchups, form: IForm) {
    if (form.result1 > form.result2) {
      item.player1.win = 1;
      item.player2.win = 0;
    } else {
      item.player1.win = 0;
      item.player2.win = 1;
    }

    item.player1.value = form.result1;
    item.player2.value = form.result2;

    lastValueFrom(this.matchupsService.update(item.id, item));
  }
}

export interface IForm {
  result1: string;
  result2: string;
}
