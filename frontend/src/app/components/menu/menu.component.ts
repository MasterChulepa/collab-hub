import { Component } from '@angular/core';
import { ChatBoardComponent } from '../chat-board/chat-board.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [ChatBoardComponent],
})
export class MenuComponent {}
