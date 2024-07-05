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

  getById(id: string) {
    return this.http.get(`${this.API}/profile/${id}`);
  }

  create(params: any) {
    return this.http.post(`${this.API}/profile`,params);
  }

  update(id: string, params: any) {
    return this.http.patch(`${this.API}/profile/${id}`,params);
  }
}
