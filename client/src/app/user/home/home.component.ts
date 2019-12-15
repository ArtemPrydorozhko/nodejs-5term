import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Post, Like } from 'src/app/shared/models/post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('imageLabel', { static: true }) imageLabel: ElementRef;
  public posts: Post[] = [{
    id: 1,
    dislikes: 2,
    likes: 1,
    text: 'dfdfd',
    userId: 111,
    mediaUrl: 'https://crowdsourcer.io/assets/images/no-img.png',
    userLike: Like.like,
    userLikeId: 1
  }, {
    id: 1,
    dislikes: 2,
    likes: 1,
    text: 'dfdfd',
    userId: 111,
    mediaUrl: null,
    userLike: Like.dislike,
    userLikeId: 2
  }];
  public newPost: FormGroup;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.newPost = new FormGroup({
      'image': new FormControl(null),
      'text': new FormControl(null, [Validators.required])
    });
  }

  public onDeletePost(post: Post) {
    this.posts.splice(this.posts.indexOf(post), 1);
  }

  public onCreatePost() {
    console.log(this.newPost);
    
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
}
