import { Component, signal } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent],
  template: `<app-menu></app-menu>`,
  styles: [],
})
export class App {
  protected readonly title = signal('collab-hub-frontend');
}
