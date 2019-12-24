import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post.model';
import { ServerService } from 'src/app/shared/services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/shared/models/group.model';
import { TokenService } from 'src/app/shared/services/token/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  public isPostMode: boolean = true;
  public isAdmin: boolean;
  public isMember: boolean;
  public posts: Post[];
  public group: Group;
  public userId: number;
  public newPost: FormGroup;
  private groupId: number;
  constructor(private serverService: ServerService,
    private route: ActivatedRoute,
    private tokenSevice: TokenService,
    private router: Router) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params.id;
    this.userId = this.tokenSevice.getUserId();
    this.newPost = new FormGroup({
      'mediaUrl': new FormControl(null),
      'text': new FormControl(null, [Validators.required])
    });
    this.serverService.getGroupPosts(this.groupId).subscribe((posts: Post[]) => {
      console.log(posts);
      this.posts = posts;
    });

    this.serverService.getGroup(this.groupId).subscribe((group: any) => {
      console.log(group);

      this.group = group;
      this.isAdmin = this.group.users.some((user) => user['groupuser.admin'] === this.userId);
      this.isMember = this.group.users.some((user) => user.id === this.userId);
    });

  }

  public onCreatePost() {
    this.serverService.createGroupPost({
      text: this.newPost.value.text,
      mediaUrl: this.newPost.value.mediaUrl,
      groupId: this.groupId
    }).subscribe((result) => {
      const newPost: any = Object.assign({}, result);
      newPost.likes = 0;
      newPost.dislikes = 0;
      newPost.userLike = null;
      newPost.userLikeId = null;
      newPost.comments = [];
      this.posts.unshift(newPost);
    });
  }

  public onJoinGroup() {
    this.serverService.addUserToGroup(this.groupId).subscribe((result) => {
      this.isMember = true;
      console.log(result);
    })
  }

  public onLeaveGroup() {
    this.serverService.removeUserFromGroup(this.groupId, this.userId).subscribe((result) => {
      this.router.navigate(['/groups']);
      console.log(result);
    })
  }

  public onToggleMode() {
    this.isPostMode = !this.isPostMode;
  }

  public onUserSelected(userId: number) {
    if (userId === this.userId) {
      this.router.navigate([`/home`]);
    } else {
      this.router.navigate([`/user/${userId}`]);
    }
  }
}
