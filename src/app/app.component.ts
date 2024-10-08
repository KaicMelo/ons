import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketIoConfigModule } from './socket-io-config/socket-io-config.module';
import { MenuComponent } from './routes/menu/menu.component';
import { SocketService } from '@services/socket/socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SocketIoConfigModule, SocketIoModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [SocketService],
})
export class AppComponent implements OnInit {
  message!: string;

  socketService: SocketService = inject(SocketService);

  ngOnInit() {
    this.socketService.getMessage().subscribe((message) => {
      this.message = message;
    });
  }

  sendMessage() {
    this.socketService.sendMessage('Hello from Angular Standalone Component');
  }
}
