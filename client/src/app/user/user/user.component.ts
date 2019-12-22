import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Post } from 'src/app/shared/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/shared/services/http/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User;
  public posts: Post[];
  public isFriend: boolean;
  private id: number;
  constructor(private route: ActivatedRoute,
    private serverService: ServerService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    this.serverService.areFriends(this.id).subscribe(friend => {
      this.isFriend = friend !== null;
      console.log(this.isFriend);
    });

    this.serverService.getUser(this.id).subscribe((user: User) => {
      this.user = user;
    });
    this.serverService.getPosts(this.id).subscribe((posts: Post[]) => {
      this.posts = posts;
    });

  }

  public onAddToFriends() {
    this.serverService.addFriend(this.id).subscribe((result) => {
      if (result) {
        this.isFriend = true;
      }
    });
  }

  public onOpenChat() {
    this.serverService.createChat(this.id).subscribe((result: any) => {
      console.log(result);
      
      this.router.navigate([`/chats/${result.id}`]);
    });
  }
}
