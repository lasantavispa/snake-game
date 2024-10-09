import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { SnakeComponent } from '../snake/snake.component';
import { FoodComponent } from '../food/food.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SnakeComponent, FoodComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit, AfterViewInit{
@Output() playGameChange = new EventEmitter<boolean>();
@Output() scoreEmit = new EventEmitter <number>();
@Input() playGame: boolean | undefined;

  @ViewChild('board', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  cellSize: number = 20;
  rows: number = 40;
  cols: number = 60;
  score: number = 0;
  gameSpeed = 200;
  private intervalId: any;
  private snake!: SnakeComponent;
  private food!: FoodComponent;

  ngOnInit(): void {
    this.setBoardDimensions();
  }

  ngAfterViewInit(): void {
    this.initializeGame();
  }

  private setBoardDimensions(): void {
    if (window.innerWidth < 600) {
      this.cellSize = 18;
      this.rows = 18;
      this.cols = 18;
    } else {
      this.cellSize = 18;
      this.rows = 18;
      this.cols = 48;
    }
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!this.ctx) throw new Error('Failed to get 2D context');

    canvas.width = this.cols * this.cellSize;
    canvas.height = this.rows * this.cellSize;
  }

  private drawGrid(): void {
    this.ctx.clearRect(0, 0, this.cols * this.cellSize, this.rows * this.cellSize);
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.ctx.strokeStyle = '#9aaf59';
        this.ctx.strokeRect(
          col * this.cellSize,
          row * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }

  initializeGame() {
    this.setBoardDimensions();
    this.setupCanvas();

    this.snake = new SnakeComponent();
    this.snake.initialize(this.rows, this.cols);

    this.food = new FoodComponent();
    this.food.initialize(this.rows, this.cols);

    this.startGameLoop();
  }

  startGameLoop() {

    this.intervalId = setInterval(() => {

      this.updateGame();
      this.drawGrid();

      this.drawGame();
    }, this.gameSpeed)
  }

  updateGame() {
    this.snake.move();

    if(this.snake.isEatingFood(this.food.position)) {
      this.score++;
      this.snake.grow();
      this.food.generateNewPosition(this.cols, this.rows);
      this.updateGameSpeed();
      this.scoreEmit.emit(this.score)
    } else if (this.snake.isColliding()) {
      this.playGameChange.emit(false);
      clearInterval(this.intervalId);
      this.initializeGame();
    }

  }

  drawGame() {
    this.ctx.clearRect(0, 0, this.cols * this.cellSize, this.rows * this.cellSize);

    this.snake.draw(this.ctx, this.cellSize);
    this.food.draw(this.ctx, this.cellSize);
  }

  private updateGameSpeed() {
    if (this.score % 10 === 0) {
      this.gameSpeed = Math.max (100, this.gameSpeed - 20);
      clearInterval(this.intervalId);
      this.startGameLoop();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.snake.setDirection({ row: -1, col: 0 });
        break;
      case 'ArrowDown':
        this.snake.setDirection({ row: 1, col: 0 });
        break;
      case 'ArrowLeft':
        this.snake.setDirection({ row: 0, col: -1 });
        break;
      case 'ArrowRight':
        this.snake.setDirection({ row: 0, col: 1 });
        break;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setBoardDimensions();
    this.setupCanvas();
    this.drawGrid();
  }

  changeDirection(direction: { row: number; col: number }) {
    this.snake.setDirection(direction);
  }
}
