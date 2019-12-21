import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Post, Like } from 'src/app/shared/models/post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from 'src/app/shared/services/http/http.service';
import { TokenService } from 'src/app/shared/services/token/token.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('imageLabel', { static: true }) imageLabel: ElementRef;
  public posts: Post[];
  // [{
  //   id: 1,
  //   dislikes: 2,
  //   likes: 1,
  //   text: 'dfdfd',
  //   userId: 111,
  //   mediaUrl: 'https://crowdsourcer.io/assets/images/no-img.png',
  //   userLike: Like.like,
  //   userLikeId: 1,
  //   comments: [{
  //     firstname: 'asdfa',
  //     lastname: 'aaaaaaaa',
  //     id: 1,
  //     text: 'aaaaaaaaaaaadsfoufi oasd dofgdfg utodj ;ocmvnm gsdyrb foigjd',
  //     userId: 1212
  //   },{
  //     firstname: 'asdfa',
  //     lastname: 'aaaaaaaa',
  //     id: 1,
  //     text: 'aaaaaaaaaaaadsfoufi oasd dofgdfg utodj ;ocmvnm gsdyrb foigjd',
  //     userId: 1212
  //   }]
  // }, {
  //   id: 1,
  //   dislikes: 2,
  //   likes: 1,
  //   text: 'dfdfd',
  //   userId: 111,
  //   mediaUrl: null,
  //   userLike: Like.dislike,
  //   userLikeId: 2,
  //   comments: [{
  //     firstname: 'asdfa',
  //     lastname: 'aaaaaaaa',
  //     id: 1,
  //     text: 'aaaaaaaaaaaadsfoufi oasd dofgdfg utodj ;ocmvnm gsdyrb foigjd',
  //     userId: 1212
  //   }]
  // }];
  public newPost: FormGroup;
  public user: User;

  constructor(private cd: ChangeDetectorRef,
              private serverService: ServerService,
              private tokenService: TokenService) { }

  ngOnInit() {
    this.newPost = new FormGroup({
      'mediaUrl': new FormControl(null),
      'text': new FormControl(null, [Validators.required])
    });

    this.user = this.tokenService.getDecodedToken();

    this.serverService.getPosts(this.user.id).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  public onDeletePost(post: Post) {
    this.posts.splice(this.posts.indexOf(post), 1);
  }

  public onCreatePost() {
    this.serverService.createPost({
      text: this.newPost.value.text,
      mediaUrl: this.newPost.value.mediaUrl
    }).subscribe((result) => {
      const newPost: any = Object.assign({}, result);
      newPost.likes = 0;
      newPost.dislikes = 0;
      newPost.userLike = null;
      newPost.userLikeId = null;
      this.posts.unshift(newPost);
    });
  }

  public uploadFile(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.newPost.patchValue({
          'image': reader.result
        });

        (<HTMLLabelElement>this.imageLabel.nativeElement).innerText = file.name;
        this.cd.markForCheck();
      };
    }
  }

  public onChangeAvatar(avatarUrl) {
    if (!avatarUrl.value) {
      return;
    }
    this.serverService.updateUserAvatar(avatarUrl.value, this.user.id).subscribe((result: any) => {
      this.user.avatarUrl = result.avatarUrl;
    });
  }
}
