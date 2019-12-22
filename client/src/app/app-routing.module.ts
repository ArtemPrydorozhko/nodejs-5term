import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './user/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './user/home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { UserComponent } from './user/user/user.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './groups/group/group.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatComponent } from './chats/chat/chat.component';
import { GroupChatComponent } from './chats/group-chat/group-chat.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'friends',
        component: FriendsComponent
      },
      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'groups/:id',
        component: GroupComponent
      },
      {
        path: 'chats',
        component: ChatsComponent
      },
      {
        path: 'chats/:id',
        component: ChatComponent
      },
      {
        path: 'groupChats/:id',
        component: GroupChatComponent
      },
      {
        path: 'user/:id',
        component: UserComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'error-page',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
