import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './user/users.component';
import { UserComponent } from './user/user/user.component';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './user/home/home.component';
import { PostComponent } from './user/post/post.component';
import { AuthInterceptor } from './auth-interceptor.service';
import { FriendsComponent } from './friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    LoginComponent,
    ErrorPageComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    FriendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
