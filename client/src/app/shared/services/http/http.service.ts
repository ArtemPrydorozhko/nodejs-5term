import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Like } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3000';

  public login(user: { email: string, password: string }) {
    return this.http.post<string>(this.url + '/api/authservice/login', {
      email: user.email,
      password: user.password
    });
  }

  public signup(user: { email: string, password: string, firstname: string, lastname: string }) {
    return this.http.post<string>(this.url + '/api/authservice/signup', {
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname
    });
  }

  public likePost(like: {type: Like, postId: number}) {
    return this.http.post(this.url + '/api/userservice/like', {
      type: like.type,
      postId: like.postId
    });
  }

  public deleteLike(likeId: number) {
    return this.http.delete(this.url + `/api/userservice/like/${likeId}`);
  }

  public updateLike(like: {likeId: number, type: Like}) {
    return this.http.put(this.url + `/api/userservice/like/${like.likeId}`, {
      type: like.type
    });
  }

  public deletePost(postId: number) {
    return this.http.delete(this.url + `/api/userservice/post/${postId}`);
  }

  public createPost(post: {text: string, mediaUrl: string}) {
    return this.http.post(this.url + '/api/userservice/post', {
      text: post.text,
      mediaUrl: post.mediaUrl
    });
  }

  public getPosts(userId: number) {
    return this.http.get(this.url + `/api/userservice/post/user/${userId}`);
  }

  public createComment(comment: {text: string, postId: number}) {
    return this.http.post(this.url + '/api/userservice/comment', {
      text: comment.text,
      postId: comment.postId
    })
  }

  public deleteComment(id: number) {
    return this.http.delete(this.url + `/api/userservice/comment/${id}`);
  }

  public getFriends() {
    return this.http.get(this.url + `/api/userservice/friend`);
  }

  public getUsers() {
    return this.http.get(this.url + `/api/userservice/user`);
  }

  public getUser(id: number) {
    return this.http.get(this.url + `/api/userservice/user/${id}`);
  }

  public updateUserAvatar(avatarUrl: string, id: number) {
    return this.http.put(this.url + `/api/userservice/user/${id}`,
    {
      avatarUrl
    });
  }

  public getFriend(friendId: number) {
    return this.http.get(this.url + `/api/userservice/friend/${friendId}`);
  }

  public addFriend(friendId: number) {
    return this.http.post(this.url + `/api/userservice/friend`,
    {
      friendId
    });
  }
}
