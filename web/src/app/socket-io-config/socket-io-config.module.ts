import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  imports: [SocketIoModule.forRoot(config)],
  exports: [SocketIoModule]
})
export class SocketIoConfigModule { }
