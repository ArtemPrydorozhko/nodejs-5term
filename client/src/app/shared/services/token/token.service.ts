import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../../models/user.model';
import { RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private JWTHelper: JwtHelperService;
  public urlToNavigate: string;
  public tokenSubject =  new Subject<void>();
  constructor() {
    this.JWTHelper = new JwtHelperService();
   }

  public setToken(token: string) {
    sessionStorage.setItem('token', token);
    const decoded = this.JWTHelper.decodeToken(token);
    sessionStorage.setItem('decodedToken', JSON.stringify(decoded));
    this.tokenSubject.next();
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public getDecodedToken(): User {
    return JSON.parse(sessionStorage.getItem('decodedToken'));
  }

  public getUserId(): number {
    return JSON.parse(sessionStorage.getItem('decodedToken')).id;
  }

  public isAuthorized(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }

  public deleteToken() {
    sessionStorage.clear();
  }
}
