import { NgModule } from '@angular/core';
import { environment } from '@environment/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: environment.SOCKET, options: {} };

@NgModule({
  imports: [SocketIoModule.forRoot(config)],
  exports: [SocketIoModule]
})
export class SocketIoConfigModule { }
