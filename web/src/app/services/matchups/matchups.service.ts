import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayers } from '@shared/interfaces/players.interface';
import { environment } from '@environment/environment';
import { IMatchups } from '@shared/interfaces/matchups.interface';

@Injectable({
  providedIn: 'root',
})
export class MatchupsService {
  http: HttpClient = inject(HttpClient);

  API = environment.API;

  get():Observable<IMatchups[]> {
    return this.http.get<IMatchups[]>(`${this.API}/matchups`);
  }

  setMatchups(params: IMatchups) {
    return this.http.post(`${this.API}/matchups`,params);
  }

  update(id: string, params: any) {
    return this.http.patch(`${this.API}/matchups/${id}`,params);
  }
}
