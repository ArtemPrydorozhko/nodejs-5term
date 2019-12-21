import { Component, OnInit } from '@angular/core';
import { ServerService } from '../shared/services/http/http.service';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { TokenService } from '../shared/services/token/token.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  public friends: User[];
  public users: User[];
  constructor(private serverService: ServerService,
              private router: Router,
              private tokenService: TokenService) { }

  ngOnInit() {
    this.serverService.getFriends().subscribe((friends: User[]) => {
      const id = this.tokenService.getUserId();
      this.friends = friends.filter((friend) => friend.id !== id);
    });
    this.serverService.getUsers().subscribe((users: User[]) => {
      const id = this.tokenService.getUserId();
      this.users = users.filter((user) => user.id !== id);;
      console.log(users);
    });
  }

  public onFriendSelected(id: number) {
    this.router.navigate([`/user/${id}`]);
  }

  public onUserSelected(id: number) {
    this.router.navigate([`/user/${id}`]);
  }

}
