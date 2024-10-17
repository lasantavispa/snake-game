import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from "./components/board/board.component";
import { GameoverComponent } from "./components/gameover/gameover.component";
import { MobileControlsComponent } from "./components/mobile-controls/mobile-controls.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent, GameoverComponent, MobileControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @Output() directionChange = new EventEmitter <string>();
  @ViewChild(BoardComponent) boardComponent!: BoardComponent;

  playGame = true;
  score: any;


  onPlayGameChange(playGame: boolean) {
    this.playGame = playGame;
  }

  onScoreChange(newScore: number) {
    this.score = newScore;
  }

  restartGame() {
    this.playGame = true;
    this.score = 0;
  }


  moveUp() {
    this.directionChange.emit('ArrowUp');
    this.boardComponent.directionChange = 'ArrowUp';
    this.boardComponent.handleMobileControl();
  }

  moveDown() {
    this.directionChange.emit('ArrowDown');
    this.boardComponent.directionChange = 'ArrowDown';
    this.boardComponent.handleMobileControl();
  }

  moveLeft() {
    this.directionChange.emit('ArrowLeft');
    this.boardComponent.directionChange = 'ArrowLeft';
    this.boardComponent.handleMobileControl();
  }

  moveRight() {
    this.directionChange.emit('ArrowRight');
    this.boardComponent.directionChange = 'ArrowRight';
    this.boardComponent.handleMobileControl();
  }

}
