import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.css'
})

@Injectable({
  providedIn: 'root'
 })

export class SnakeComponent {
  body = [{ row: 10, col: 10}];
  direction = { row: 0, col: 1};
  rows!: number;
  cols!: number;

  initialize(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
  }

  setDirection( newDirection: { row: number; col: number}) {
    if ((newDirection.row === -this.direction.row && newDirection.col === 0) || ( newDirection.row === 0 && newDirection.col === -this.direction.col)) {
      return;
    }
    this.direction = newDirection;
  }

  move() {
    const head = { row: this.body[0].row + this.direction.row, col: this.body[0].col + this.direction.col };
    this.body.unshift(head);
    this.body.pop();
  }

  grow() {
    const tail =  this.body[this.body.length - 1];
    this.body.push({...tail})
  }

  isEatingFood(foodPosition: { row: number, col:number}): boolean {
    const head = this.body [0];
    return head.row === foodPosition.row && head.col === foodPosition.col;
  }

  isColliding(): boolean {
    const head = this.body[0];
    return (
      head.row < 0 ||
       head.col < 0 ||
       head.row >= this.rows ||
       head.col >= this.cols ||
       this.body.slice(1).some(segment =>segment.row === head.row && segment.col === head.col)
    )
  }



// draw(ctx: CanvasRenderingContext2D, cellSize: number) {
//   this.body.forEach((segment, index) => {
//       if (index === 0) {
//           // Dibuja la cabeza de la serpiente con una parte frontal redondeada y una parte trasera cuadrada
//           ctx.fillStyle = '#275227';

//           // Parte trasera cuadrada
//           // ctx.fillRect(segment.col * cellSize, segment.row * cellSize, cellSize, cellSize);

//           // Parte frontal redondeada
//           ctx.beginPath();
//           ctx.arc(
//               segment.col * cellSize + cellSize / 2, // x
//               segment.row * cellSize + cellSize / 2, // y
//               cellSize / 2,                          // radio
//               0.75 * Math.PI,                        // ángulo inicial (45 grados para la curva frontal)
//               0.25 * Math.PI,                        // ángulo final
//               false
//           );
//           ctx.fill();

//           // Dibuja la lengua
//           ctx.fillStyle = '#FF0000'; // Color de la lengua
//           ctx.beginPath();
//           ctx.moveTo(
//               segment.col * cellSize + cellSize / 2, // x punta de la lengua
//               segment.row * cellSize                 // y punta de la lengua
//           );
//           ctx.lineTo(
//               segment.col * cellSize + cellSize / 2 - cellSize / 8, // x lado izquierdo de la lengua
//               segment.row * cellSize - cellSize / 4                 // y lado izquierdo de la lengua
//           );
//           ctx.lineTo(
//               segment.col * cellSize + cellSize / 2 + cellSize / 8, // x lado derecho de la lengua
//               segment.row * cellSize - cellSize / 4                 // y lado derecho de la lengua
//           );
//           ctx.closePath();
//           ctx.fill();

//           // Dibuja los ojos
//           ctx.fillStyle = '#ffffff'; // Color de los ojos
//           const eyeOffset = cellSize / 4;
//           const eyeSize = cellSize / 8;

//           // Ojo izquierdo
//           ctx.beginPath();
//           ctx.arc(
//               segment.col * cellSize + cellSize / 2 - eyeOffset, // x
//               segment.row * cellSize + cellSize / 4,             // y (ajustado para la parte frontal)
//               eyeSize,                                           // radio del ojo
//               0,
//               2 * Math.PI
//           );
//           ctx.fill();

//           // Ojo derecho
//           ctx.beginPath();
//           ctx.arc(
//               segment.col * cellSize + cellSize / 2 + eyeOffset, // x
//               segment.row * cellSize + cellSize / 4,             // y
//               eyeSize,                                           // radio del ojo
//               0,
//               2 * Math.PI
//           );
//           ctx.fill();
//       } else {
//           // Dibuja el cuerpo de la serpiente con dos líneas grises
//           ctx.fillStyle = '#275227';
//           ctx.fillRect(segment.col * cellSize, segment.row * cellSize, cellSize, cellSize);

//           // Dibuja las líneas grises del cuerpo
//           ctx.strokeStyle = '#A9A9A9'; // Color de las líneas
//           ctx.lineWidth = 1;

//           // Línea horizontal superior
//           ctx.beginPath();
//           ctx.moveTo(segment.col * cellSize, segment.row * cellSize + cellSize * 0.25);
//           ctx.lineTo(segment.col * cellSize + cellSize, segment.row * cellSize + cellSize * 0.25);
//           ctx.stroke();

//           // Línea horizontal inferior
//           ctx.beginPath();
//           ctx.moveTo(segment.col * cellSize, segment.row * cellSize + cellSize * 0.75);
//           ctx.lineTo(segment.col * cellSize + cellSize, segment.row * cellSize + cellSize * 0.75);
//           ctx.stroke();
//       }
//   });
// }



draw(ctx: CanvasRenderingContext2D, cellSize: number) {
  this.body.forEach((segment, index) => {
    if (index === 0) {
      // Dibujar la cabeza de la serpiente redondeada
      // ctx.fillStyle = '#275227';
      // ctx.beginPath();
      // ctx.arc(
      //   segment.col * cellSize + cellSize / 2,
      //   segment.row * cellSize + cellSize / 2,
      //   cellSize / 2,
      //   0.75 * Math.PI,
      //   0.25 * Math.PI,
      //   false
      // );
      // Dibuja la cabeza de la serpiente
      ctx.fillStyle = '#275227';

      ctx.fillRect(segment.col * cellSize, segment.row * cellSize, cellSize, cellSize);
      ctx.fill();

      // Dibuja la lengua en la dirección adecuada
      ctx.fillStyle = '#FF0000';
      const tongueOffset = cellSize / 4;
      ctx.beginPath();
      if (this.direction.row === 1) {
        ctx.moveTo(segment.col * cellSize + cellSize / 2, segment.row * cellSize + cellSize);
        ctx.lineTo(segment.col * cellSize + cellSize / 2 - tongueOffset, segment.row * cellSize + cellSize + tongueOffset);
        ctx.lineTo(segment.col * cellSize + cellSize / 2 + tongueOffset, segment.row * cellSize + cellSize + tongueOffset);
      } else if (this.direction.row === -1) {
        ctx.moveTo(segment.col * cellSize + cellSize / 2, segment.row * cellSize);
        ctx.lineTo(segment.col * cellSize + cellSize / 2 - tongueOffset, segment.row * cellSize - tongueOffset);
        ctx.lineTo(segment.col * cellSize + cellSize / 2 + tongueOffset, segment.row * cellSize - tongueOffset);
      } else if (this.direction.col === 1) {
        ctx.moveTo(segment.col * cellSize + cellSize, segment.row * cellSize + cellSize / 2);
        ctx.lineTo(segment.col * cellSize + cellSize + tongueOffset, segment.row * cellSize + cellSize / 2 - tongueOffset);
        ctx.lineTo(segment.col * cellSize + cellSize + tongueOffset, segment.row * cellSize + cellSize / 2 + tongueOffset);
      } else if (this.direction.col === -1) {
        ctx.moveTo(segment.col * cellSize, segment.row * cellSize + cellSize / 2);
        ctx.lineTo(segment.col * cellSize - tongueOffset, segment.row * cellSize + cellSize / 2 - tongueOffset);
        ctx.lineTo(segment.col * cellSize - tongueOffset, segment.row * cellSize + cellSize / 2 + tongueOffset);
      }
      ctx.closePath();
      ctx.fill();

    // Dibuja los ojos de la serpiente
  ctx.fillStyle = '#ffffff';
  const eyeOffset = cellSize / 4;
  const eyeSize = cellSize / 8;

// Ajusta la posición de los ojos según la dirección de movimiento
    ctx.beginPath();
    if (this.direction.row === -1) { // Arriba
      // Mantener ojos horizontales y pegados arriba
      ctx.arc(segment.col * cellSize + cellSize / 2 - eyeOffset, segment.row * cellSize + cellSize / 2 - eyeOffset, eyeSize, 0, 2 * Math.PI);
      ctx.arc(segment.col * cellSize + cellSize / 2 + eyeOffset, segment.row * cellSize + cellSize / 2 - eyeOffset, eyeSize, 0, 2 * Math.PI);
    } else if (this.direction.row === 1) { // Abajo
      // Ojos horizontales, pegados abajo
      ctx.arc(segment.col * cellSize + cellSize / 2 - eyeOffset, segment.row * cellSize + cellSize - eyeOffset, eyeSize, 0, 2 * Math.PI);
      ctx.arc(segment.col * cellSize + cellSize / 2 + eyeOffset, segment.row * cellSize + cellSize - eyeOffset, eyeSize, 0, 2 * Math.PI);
    } else if (this.direction.col === 1) { // Derecha
      // Ojos verticales, pegados a la derecha
      ctx.arc(segment.col * cellSize + cellSize - eyeOffset, segment.row * cellSize + cellSize / 2 - eyeOffset, eyeSize, 0, 2 * Math.PI);
      ctx.arc(segment.col * cellSize + cellSize - eyeOffset, segment.row * cellSize + cellSize / 2 + eyeOffset, eyeSize, 0, 2 * Math.PI);
    } else if (this.direction.col === -1) { // Izquierda
      // Ojos verticales, pegados a la izquierda
      ctx.arc(segment.col * cellSize + eyeOffset, segment.row * cellSize + cellSize / 2 - eyeOffset, eyeSize, 0, 2 * Math.PI);
      ctx.arc(segment.col * cellSize + eyeOffset, segment.row * cellSize + cellSize / 2 + eyeOffset, eyeSize, 0, 2 * Math.PI);
    }
    ctx.fill();
    } else {
      // Dibuja el cuerpo de la serpiente con dos líneas grises
      ctx.fillStyle = '#275227';
      ctx.fillRect(segment.col * cellSize, segment.row * cellSize, cellSize, cellSize);

      // Líneas grises para el cuerpo
      ctx.strokeStyle = '#A9A9A9';
      ctx.lineWidth = 1;

      // Línea horizontal superior
      ctx.beginPath();
      ctx.moveTo(segment.col * cellSize, segment.row * cellSize + cellSize * 0.25);
      ctx.lineTo(segment.col * cellSize + cellSize, segment.row * cellSize + cellSize * 0.25);
      ctx.stroke();

      // Línea horizontal inferior
      ctx.beginPath();
      ctx.moveTo(segment.col * cellSize, segment.row * cellSize + cellSize * 0.75);
      ctx.lineTo(segment.col * cellSize + cellSize, segment.row * cellSize + cellSize * 0.75);
      ctx.stroke();
    }
  });
}


}
