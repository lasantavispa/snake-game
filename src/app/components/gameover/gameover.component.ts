import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gameover',
  standalone: true,
  imports: [],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.css'
})
export class GameoverComponent {
  @Input() score: number = 0;  // Puntuación actual que viene del componente padre (AppComponent)
  record: number = 0;  // Récord guardado
  newRecord: boolean = false;  // Si se ha batido el récord

  ngOnInit() {
    this.checkHighScore();
  }

  checkHighScore() {
    // Obtener el récord desde el localStorage, si no hay se asigna 0
    const storedRecord = localStorage.getItem('highScore');
    this.record = storedRecord ? parseInt(storedRecord) : 0;

    // Si la puntuación actual es mayor que el récord
    if (this.score > this.record) {
      // Actualizar el récord en el localStorage
      localStorage.setItem('highScore', this.score.toString());
      this.record = this.score;
      this.newRecord = true; // Activar el mensaje de "has batido tu récord"
    }
  }
}
