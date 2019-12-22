import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/chat.model';
import { WebSocketService } from 'src/app/shared/services/web-socket/web-socket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from 'src/app/shared/services/http/http.service';
import { TokenService } from 'src/app/shared/services/token/token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public messages: Message[];
  public newMessage: FormGroup;
  public userId: number;
  public chatId: number;
  constructor(private webSocketService: WebSocketService,
              private serverService: ServerService,
              private tokenService: TokenService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.tokenService.getUserId();
    this.chatId = this.route.snapshot.params.id;
    this.newMessage = new FormGroup({
      'mediaUrl': new FormControl(null),
      'text': new FormControl(null)
    });
    
    this.serverService.getChatMessages(this.chatId).subscribe((data: any) => {
      console.log(data);
      this.messages = data;
    });
    this.webSocketService.listen('chatMessage').subscribe((data: Message) => {
      console.log('111',data);
      
      this.messages.push(data);
    });
  }

  public onSendMessage() {
    if (!this.newMessage.value.mediaUrl && !this.newMessage.value.text) {
      return;
    }

    this.serverService.sendMessage({
      userId: this.userId,
      chatId: this.chatId,
      text: this.newMessage.value.text,
      mediaUrl: this.newMessage.value.mediaUrl,
      time: new Date()
    }).subscribe((result: Message) => {
      console.log(result);
    });
  }

}
