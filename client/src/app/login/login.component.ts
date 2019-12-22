import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../shared/services/http/http.service';
import { TokenService } from '../shared/services/token/token.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { WebSocketService } from '../shared/services/web-socket/web-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLogin: boolean = true;
  public form: FormGroup;
  public error: string | null = null;

  constructor(private httpService: ServerService,
    private tokenService: TokenService,
    private router: Router,
    private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'firstname': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
    })
  }

  public onChangeType() {
    this.isLogin = !this.isLogin;
  }

  public onSubmit() {
    if (this.isLogin) {
      this.httpService.login({
        email: this.form.value.email,
        password: this.form.value.password
      }).subscribe((token: string) => {
        this.tokenService.setToken(token);
        this.webSocketService.emit('connect', {
          id: this.tokenService.getUserId()
        });
        if (this.tokenService.urlToNavigate) {
          this.router.navigate([this.tokenService.urlToNavigate]);
        } else {
          this.router.navigate(['/home']);
        }
      }, (error) => {
        this.error = error.message
      });
    } else {
      this.httpService.signup(this.form.value).subscribe((token: string) => {
        this.tokenService.setToken(token);
        this.webSocketService.emit('connect', {
          id: this.tokenService.getUserId()
        });
        this.router.navigate(['/home']);
      }, (error) => {
        
        this.error = error.error.error
      });
    }
  }

  public isValid(): boolean {
    if (this.isLogin) {
      return !(this.form.controls.email.valid && this.form.controls.password.valid);
    } else {
      return !this.form.valid;
    }
  }
}
