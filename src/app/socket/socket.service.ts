import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  getMessage(): Observable<string> {
    return this.socket.fromEvent<string>('message');
  }
}
