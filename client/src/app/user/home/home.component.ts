import { Component, OnInit } from '@angular/core';
import { Post, Like } from 'src/app/shared/models/post.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public posts: Post[] = [{
    id: 1,
    dislikes:2,
    likes:1,
    text: 'dfdfd',
    userId: 111,
    mediaUrl: 'https://crowdsourcer.io/assets/images/no-img.png',
    userLike: Like.like,
    userLikeId: 1
  },{
    id: 1,
    dislikes:2,
    likes:1,
    text: 'dfdfd',
    userId: 111,
    mediaUrl: null,
    userLike: Like.dislike,
    userLikeId: 2
  }];
  public newPost: FormGroup;

  constructor() { }

  ngOnInit() {
    this.newPost = new FormGroup({

    });
  }

  public onDeletePost(post: Post) {
    this.posts.splice(this.posts.indexOf(post), 1);
  }

}
