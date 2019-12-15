import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Like } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) { }

  public login(user: { email: string, password: string }) {
    return this.http.post<string>('/api/authservice/login', {
      email: user.email,
      password: user.password
    });
  }

  public signup(user: { email: string, password: string, firstname: string, lastname: string }) {
    return this.http.post<string>('/api/authservice/signup', {
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname
    });
  }

  public likePost(like: {type: Like, postId: number}) {
    return this.http.post('/api/userservice/like', {
      type: like.type,
      postId: like.postId
    });
  }

  public deleteLike(likeId: number) {
    return this.http.delete(`/api/userservice/like/${likeId}`);
  }

  public updateLike(like: {likeId: number, type: Like}) {
    return this.http.put(`/api/userservice/like/${like.likeId}`, {
      type: like.type
    });
  }

  public deletePost(postId: number) {
    return this.http.delete(`/api/userservice/post/${postId}`);
  }
}
