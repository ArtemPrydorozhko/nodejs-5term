import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../../models/user.model';
import { RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private JWTHelper: JwtHelperService;
  public urlToNavigate: string;

  constructor() {
    this.JWTHelper = new JwtHelperService();
   }

  public setToken(token: string) {
    localStorage.setItem('token', token);
    const decoded = this.JWTHelper.decodeToken(token);
    localStorage.setItem('decodedToken', decoded);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getDecodedToken(): User {
    return JSON.parse(localStorage.getItem('decodedToken'));
  }

  public isAuthorized(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
