import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Post, Like, Comment } from 'src/app/shared/models/post.model';
import { ServerService } from 'src/app/shared/services/http/http.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() canDelete: boolean;
  @Input() userId: number;
  @Output() deletePost = new EventEmitter<Post>();
  @ViewChild('commentInput', { static: false }) commentInput: ElementRef;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    console.log(this.post);
    
  }

  public isLiked() {
    return this.post.userLike === Like.like;
  }

  public isDisliked() {
    return this.post.userLike === Like.dislike;
  }

  public getComments() {
    return this.post.comments;
  }

  public onCreateComment() {
    const comment = (<HTMLInputElement>this.commentInput.nativeElement).value;
    if (!comment) {
      return;
    }

    this.serverService.createComment({ text: comment, postId: this.post.id }).subscribe((result: any) => {
      this.post.comments.push({
        firstname: result.firstname,
        lastname: result.lastname,
        id: result.id,
        text: result.text,
        userId: result.userId
      });
    });
  }

  public onDeleteComment(comment: Comment) {
    if (!confirm('Delete this comment?')) {
      return;
    }

    this.serverService.deleteComment(comment.id).subscribe((result) => {
      this.post.comments.splice(this.post.comments.indexOf(comment), 1);
    });
  }

  public onLike() {
    if (this.isLiked()) {
      this.serverService.deleteLike(this.post.userLikeId).subscribe((result) => {
        console.log(result);
        this.post.userLikeId = null;
        this.post.userLike = null;
        this.post.likes--;
      })
    } else {
      if (this.post.userLike) {
        this.serverService.updateLike({
          likeId: this.post.userLikeId,
          type: Like.like
        }).subscribe((like: any) => {
          this.post.userLike = like.type;
          this.post.userLikeId = like.id;
          this.post.likes++;
          this.post.dislikes--;
        });
      } else {
        this.serverService.likePost({ type: Like.like, postId: this.post.id }).subscribe((like: any) => {
          console.log(like);
          this.post.userLike = like.type;
          this.post.userLikeId = like.id;
          this.post.likes++;
        });
      }
    }
    console.log(this.post);
  }

  public onDislike() {
    if (this.isDisliked()) {
      this.serverService.deleteLike(this.post.userLikeId).subscribe((result) => {
        console.log(result);
        this.post.userLikeId = null;
        this.post.userLike = null;
        this.post.dislikes--;
      })
    } else {
      if (this.post.userLike) {
        this.serverService.updateLike({
          likeId: this.post.userLikeId,
          type: Like.dislike
        }).subscribe((like: any) => {
          this.post.userLike = like.type;
          this.post.userLikeId = like.id;
          this.post.likes--;
          this.post.dislikes++;
        });
      } else {
        this.serverService.likePost({ type: Like.dislike, postId: this.post.id }).subscribe((like: any) => {
          console.log(like);
          this.post.userLike = like.type;
          this.post.userLikeId = like.id;
          this.post.dislikes++;
        });
      }
    }
    console.log(this.post);
  }

  public onDeletePost() {
    if (!confirm('Delete this post?')) {
      return;
    }

    this.serverService.deletePost(this.post.id).subscribe((result) => {
      console.log(result);
      this.deletePost.emit(this.post);
    });
  }
}
