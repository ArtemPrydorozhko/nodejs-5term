import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post, Like } from 'src/app/shared/models/post.model';
import { ServerService } from 'src/app/shared/services/http/http.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Output() deletePost = new EventEmitter<Post>();

  constructor(private serverService: ServerService) { }

  ngOnInit() {
  }

  public isLiked() {
    return this.post.userLike === Like.like;
  }

  public isDisliked() {
    return this.post.userLike === Like.dislike;
  }

  public onLike() {
    if (this.isLiked()) {
      this.serverService.deleteLike(this.post.userLikeId).subscribe((result) => {
        console.log(result);
        this.post.userLikeId = null;
      })
    } else {
      if (this.post.userLike) {
        this.serverService.updateLike({
          likeId: this.post.userLikeId,
          type: Like.dislike
        }).subscribe((result: any) => {
          this.post.userLike = result.type;
        });
      } else {
        this.serverService.likePost({ type: Like.like, postId: this.post.id }).subscribe((like: any) => {
          console.log(like);
          this.post.userLikeId = like.id;
        });
      }
    }
  }

  public onDislike() {
    if (this.isDisliked()) {
      this.serverService.deleteLike(this.post.userLikeId).subscribe((result) => {
        console.log(result);
        this.post.userLikeId = null;
      })
    } else {
      if (this.post.userLike) {
        this.serverService.updateLike({
          likeId: this.post.userLikeId,
          type: Like.like
        }).subscribe((result: any) => {
          this.post.userLike = result.type;
        });
      } else {
        this.serverService.likePost({ type: Like.dislike, postId: this.post.id }).subscribe((like: any) => {
          console.log(like);
          this.post.userLikeId = like.id;
        });
      }
    }
  }

  public onDeletePost() {
    this.serverService.deletePost(this.post.id).subscribe((result) => {
      console.log(result);
      this.deletePost.emit(this.post);
    });
  }
}
