import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css'],
  imports: [FormsModule, TuiButton],
})
export class ChatBoardComponent {
  text = '';

  constructor() {}
}
