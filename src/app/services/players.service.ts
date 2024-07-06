import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayers } from '@shared/interfaces/players.interface';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  http: HttpClient = inject(HttpClient);

  API = environment.API;

  get(): Observable<IPlayers[]> {
    return this.http.get<IPlayers[]>(`${this.API}/profile`);
  }

  getById(id: string): Observable<IPlayers> {
    return this.http.get<IPlayers>(`${this.API}/profile/${id}`);
  }

  create(params: IPlayers) {
    return this.http.post(`${this.API}/profile`,params);
  }

  update(id: string, params: IPlayers) {
    return this.http.patch(`${this.API}/profile/${id}`,params);
  }
}
