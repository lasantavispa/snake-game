import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from "./components/board/board.component";
import { GameoverComponent } from "./components/gameover/gameover.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent, GameoverComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  playGame = false;
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


}
