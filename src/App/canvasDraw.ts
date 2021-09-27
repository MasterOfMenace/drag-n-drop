class Block {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    id: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.id = id;
  }
}

class CanvasDraw {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  scale: {
    scaleX: number;
    scaleY: number;
  } | null;
  ctx: CanvasRenderingContext2D | null;
  blocks: Block[];
  constructor(width: number = 300, height: number = 150) {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.ctx = null;
    this.scale = null;
    this.blocks = [];
  }

  setScale(pageWidth: number, pageHeight: number) {
    const scaleX = pageWidth / this.width;
    const scaleY = pageHeight / this.height;

    this.scale = {
      scaleX,
      scaleY,
    };

    console.log(this.scale);
  }

  createCtx() {
    this.ctx = this.canvas.getContext("2d");
  }

  clearCtx() {
    if (this.ctx) {
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      this.ctx?.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  drawBlock(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    id: number
  ) {
    if (this.ctx && this.scale) {
      const { scaleX, scaleY } = this.scale;
      this.ctx?.save();
      const block = new Block(
        x / scaleX,
        y / scaleY,
        width / scaleX,
        height / scaleY,
        color,
        id
      );
      this.blocks.push(block);
      this.ctx.fillStyle = block.color;
      this.ctx.fillRect(block.x, block.y, block.width, block.height);
    }
  }

  drawBlocks() {
    for (let block of this.blocks) {
      if (this.ctx) {
        this.ctx.fillStyle = block.color;
        this.ctx?.fillRect(block.x, block.y, block.width, block.height);
      }
    }
  }

  moveBlock(x: number, y: number, id: number) {
    console.log(x, y);

    const block = this.blocks.find((block) => block.id === id);

    if (block && this.scale) {
      const { scaleX, scaleY } = this.scale;
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      block.x = x / scaleX;
      block.y = y / scaleY;
      this.drawBlocks();
    }
  }
}

export default CanvasDraw;
