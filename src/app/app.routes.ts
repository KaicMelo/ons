import { Routes } from '@angular/router';
import { PlayersComponent } from './routes/players/players.component';
import { RegisterComponent } from './routes/players/register/register.component';
import { BattleComponent } from './routes/battle/battle.component';

export const routes: Routes = [
  {
    path: 'players',
    component: PlayersComponent,
  },
  {
    path: 'players/register',
    component: RegisterComponent,
  },
  {
    path: 'battle',
    component: BattleComponent,
  },
];
