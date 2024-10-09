import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class FoodComponent {
  position: { row: number, col: number } = { row: 0, col: 0 };
  private rows: number = 0;
  private cols: number = 0;


  initialize(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.position = this.generateNewPosition( rows, cols);
  }


  generateNewPosition( row: number, col: number ) {
    this.position.row = Math.floor(Math.random() * this.rows) ;
    this.position.col = Math.floor(Math.random() * this.cols);
    return { row: this.position.row, col: this.position.col};
  }

  // generateNewPosition(rows: number, cols: number, snakeBody: {row: number, col: number}[]): void {
  //   let newPosition: { row: any; col: any; };
  //   let positionIsOnSnake;

  //   // Repetimos hasta generar una posición que no esté ocupada por la serpiente
  //   do {
  //     newPosition = {
  //       row: Math.floor(Math.random() * rows),
  //       col: Math.floor(Math.random() * cols)
  //     };

  //     // Comprobar si la nueva posición está en el cuerpo de la serpiente
  //     positionIsOnSnake = snakeBody.some(segment => segment.row === newPosition.row && segment.col === newPosition.col);

  //   } while (positionIsOnSnake);

  //   this.position = newPosition;
  // }



draw(ctx: CanvasRenderingContext2D, cellSize: number) {
  const centerX = this.position.col * cellSize + cellSize / 2;
  const centerY = this.position.row * cellSize + cellSize / 2;

  // Dibujar el cuerpo del ratón
  ctx.fillStyle = '#45603C';
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, cellSize / 2, cellSize / 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dibujar la cabeza
  ctx.beginPath();
  ctx.arc(centerX, centerY - cellSize / 3, cellSize / 6, 0, Math.PI * 2);
  ctx.fill();

  // Dibujar las orejas
  ctx.beginPath();
  ctx.arc(centerX - cellSize / 6, centerY - cellSize / 4, cellSize / 5, 0, Math.PI * 2);
  ctx.fill();


  // Dibujar los ojos
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(centerX - cellSize / 5, centerY - cellSize / 6, cellSize / 20, 0, Math.PI * 2);
  ctx.fill();


  // Dibujar la nariz
  ctx.fillStyle = '#d10a0a';
  ctx.beginPath();
  ctx.arc(centerX - cellSize / 2, centerY - cellSize / 19, cellSize / 20, 0, Math.PI * 2);
  ctx.fill();

  // Dibujar la cola
  ctx.strokeStyle = '#45603C';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX + cellSize / 5, centerY);
  ctx.quadraticCurveTo(centerX + cellSize / 1.5, centerY + cellSize / 4, centerX + cellSize / 1.2, centerY - cellSize / 5);
  ctx.stroke();
}

}
