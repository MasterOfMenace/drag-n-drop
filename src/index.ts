import createBlock from "./App/createBlock";
import drag from "./App/drag";
import CanvasDraw from "./App/canvasDraw";

const canvas = new CanvasDraw();
canvas.createCtx();
canvas.setScale(window.innerWidth, window.innerHeight);

const createCounter = () => {
  let counter = 1;
  return function () {
    return counter++;
  };
};

const createId = createCounter();

const onButtonClickHandler = () => {
  const block = createBlock("div", "block", "I am a block");
  const container = document.querySelector(".container");
  container?.appendChild(block);
  const id = createId();
  const blockX = block.offsetLeft;
  const blockY = block.offsetTop;

  canvas.drawBlock(blockX, blockY, block.clientWidth, block.clientHeight, id);

  const onBlockMove = () => {
    function onMouseMove(evt: MouseEvent) {
      canvas.moveBlock(
        evt.pageX - block.clientWidth / 2,
        evt.pageY - block.clientHeight / 2,
        id
      );
    }

    function remove() {
      block.removeEventListener("mousemove", onMouseMove);
      block.onmouseup = null;
    }

    block.addEventListener("mousemove", onMouseMove);
    block.addEventListener("mouseup", remove);
  };
  block.addEventListener("mousedown", drag(block));
  block.addEventListener("mousedown", onBlockMove);
};

function app() {
  console.log("hello world");
  const title = `Hello World`;
  const block = document.createElement("h1");
  block.innerHTML = title;

  const rootDiv = document.getElementById("root");
  rootDiv?.appendChild(block);

  const button = createBlock("button", "", "click me");
  rootDiv?.appendChild(button);

  const container = createBlock("div", "container");
  rootDiv?.appendChild(container);

  button.addEventListener("click", onButtonClickHandler);
}

app();
