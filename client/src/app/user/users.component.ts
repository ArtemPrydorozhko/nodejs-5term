import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../shared/services/web-socket/web-socket.service';
import { TokenService } from '../shared/services/token/token.service';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private webSocketService: WebSocketService,
    private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.isAuthorized()) {
      const id = this.tokenService.getUserId();
      this.webSocketService.emit('connect', { id });
      console.log('after connect');
      this.webSocketService.listen('aa').subscribe(data => {console.log(data), this.webSocketService.emit('connect', 11)});
    }
  }

}
