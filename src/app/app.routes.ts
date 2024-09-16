import { Routes } from '@angular/router';
import { PlayersComponent } from './routes/players/players.component';
import { RegisterComponent } from './routes/players/register/register.component';
import { BattleComponent } from './routes/battle/battle.component';
import { PointsComponent } from './routes/points/points.component';

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
    path: 'players/register/:id',
    component: RegisterComponent,
  },
  {
    path: 'battle',
    component: BattleComponent,
  },
  {
    path: 'points',
    component: PointsComponent,
  },
  {
    path: '',
    pathMatch:'full',
    redirectTo:'players'
  }
];
