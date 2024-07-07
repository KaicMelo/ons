import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
} from '@angular/forms';
import { MatchupsService } from '@services/matchups/matchups.service';
import { lastValueFrom, Observable } from 'rxjs';

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
  matchupsService: MatchupsService = inject(MatchupsService);

  $matchupsService!: Observable<any[]>;

  matchupForm!: FormGroup;

  async ngOnInit(): Promise<void> {
    this.$matchupsService = this.matchupsService.get();

    this.matchupForm = this.formBuild.group({
      result1: new FormControl(null),
      result2: new FormControl(null),
    });
  }

  lineClass(index: number) {
    return index % 2 == 0 ? 'color1' : 'color2';
  }

  onSave(item: any, form: any) {
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
