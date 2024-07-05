import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  http: HttpClient = inject(HttpClient);

  API = environment.API;

  get() {
    return this.http.get(`${this.API}/profile`);
  }
}
