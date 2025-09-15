import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css'],
  imports: [FormsModule, JsonPipe],
})
export class ChatBoardComponent {
  text: any = {};
  http = inject(HttpClient);

  sendMessage() {
    this.http
      .get('http://localhost:8000/api/rooms')
      .subscribe((res) => (this.text = res));
  }
}
