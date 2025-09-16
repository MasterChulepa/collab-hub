import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css'],
  imports: [FormsModule, JsonPipe],
})
export class ChatBoardComponent {
  text: any = {};
  roomName = '';
  roomsService = inject(RoomsService);

  createRoom() {
    if (!this.roomName.trim()) return;
    this.roomsService
      .createRoom(this.roomName.trim())
      .subscribe((res) => (this.text = res));
  }
}
