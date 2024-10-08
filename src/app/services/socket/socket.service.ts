import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  setPoints(message: string) {
    this.socket.emit('setPoints', message);
  }

  setPlayers(message: string) {
    this.socket.emit('setPlayers', message);
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  getMessage(): Observable<string> {
    return this.socket.fromEvent<string>('message');
  }

  getPoints(): Observable<string> {
    return this.socket.fromEvent<string>('setPoints');
  }

  getPlayers(): Observable<string> {
    return this.socket.fromEvent<string>('setPlayers');
  }
}
