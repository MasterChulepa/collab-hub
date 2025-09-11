import { Component, effect, inject } from '@angular/core';
import {
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  ReadyArgs,
  typeEventArgs,
} from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { ChatBoardComponent } from '../chat-board/chat-board.component';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [ChatBoardComponent, AuthComponent],
})
export class MenuComponent {}
