import Brick from './Brick';

interface BrickVars {
  cols: number;
  rows: number;
  width: number;
  height: number;
  padding: number;
  offsetLeft: number;
  offsetTop: number;
  color: string[];
}

class Bricks {
  cols: number;
  rows: number;
  bricks: any[];
  width: number;
  height: number;
  padding: number;
  offsetLeft: number;
  offsetTop: number;
  color: string[];

  constructor({
    cols, rows, width, height, padding, offsetLeft, offsetTop, color,
  }: BrickVars) {
    this.cols = cols;
    this.rows = rows;
    this.bricks = [];
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.offsetLeft = offsetLeft;
    this.offsetTop = offsetTop;
    this.color = color;
    this.init();
  }

  init() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = c * (this.width + this.padding) + this.offsetLeft;
        const brickY = r * (this.height + this.padding) + this.offsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, this.width, this.height, this.color[c]);
      }
    }
  }

  render(ctx:any) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }
}

export default Bricks;
