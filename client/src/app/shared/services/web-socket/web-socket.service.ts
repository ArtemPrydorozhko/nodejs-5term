import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: any;
  private url;
  constructor(private tokenService: TokenService) {
    const base = 'http://localhost:3000';
    if (!this.tokenService.isAuthorized()) {
      this.tokenService.tokenSubject.subscribe(() => {
      this.url = base+'/api/chatservice';//window.location.hostname + '/api/chatservice';
      this.socket = io.connect(this.url, { query: `id=${this.tokenService.getUserId()}`});  
      console.log(this.socket);
      });
    } else {
      this.url = base+'/api/chatservice';//window.location.hostname + '/api/chatservice';
      this.socket = io.connect(this.url, { query: `id=${this.tokenService.getUserId()}`});  
      console.log(this.socket);
    }
  }

  public listen(eventName: string) {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      })
    })
  }

  public emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
