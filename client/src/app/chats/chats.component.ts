import { Component, OnInit } from '@angular/core';
import { ServerService } from '../shared/services/http/http.service';
import { Chat } from '../shared/models/chat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  public chats: Chat[];
  constructor(private serverService: ServerService,
              private router: Router) { }

  ngOnInit() {
    this.serverService.getChats().subscribe((result: any) => {
      console.log(result);
      this.chats = result;
    });
  }

  public onChatSelected(chatId: number) {
    this.router.navigate([`/chats/${chatId}`]);
  }
}
