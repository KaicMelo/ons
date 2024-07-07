import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayers } from '@shared/interfaces/players.interface';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchupsService {
  http: HttpClient = inject(HttpClient);

  API = environment.API;

  get():Observable<any[]> {
    return this.http.get<any>(`${this.API}/matchups`);
  }

  setMatchups(params: any) {
    return this.http.post(`${this.API}/matchups`,params);
  }

  update(id: string, params: IPlayers) {
    return this.http.patch(`${this.API}/matchups/${id}`,params);
  }
}
