import { Component, inject, OnInit } from '@angular/core';
import { WebSocketService } from '../../websocket/websocket.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css'],
  imports: [FormsModule, TuiButton],
})
export class ChatBoardComponent implements OnInit {
  private webSocketService = inject(WebSocketService);
  message = toSignal(this.webSocketService.messageSubject);

  text = '';

  constructor() {}

  ngOnInit() {
    this.webSocketService.connect();
  }

  sendMessage(message: string) {
    this.webSocketService.sendMessage(message);
  }
}
