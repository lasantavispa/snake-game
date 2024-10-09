import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-mobile-controls',
  standalone: true,
  imports: [],
  templateUrl: './mobile-controls.component.html',
  styleUrl: './mobile-controls.component.css'
})
export class MobileControlsComponent {
  snakeDirection: string | undefined;
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' && this.snakeDirection!== 'ArrowDown') {
      this.snakeDirection = 'ArrowUp';
    } else if (event.key === 'ArrowDown' && this.snakeDirection!== 'ArrowUp') {
      this.snakeDirection = 'ArrowDown';
    } else if (event.key === 'ArrowLeft' && this.snakeDirection!== 'ArrowRight') {
      this.snakeDirection = 'ArrowLeft';
    } else if (event.key === 'ArrowRight' && this.snakeDirection!== 'ArrowLeft') {
      this.snakeDirection = 'ArrowRight';
    }
  }
}
