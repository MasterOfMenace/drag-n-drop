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

// function moveBlockOnMap(id: number, block: HTMLElement) {
//   return function () {
//     const onBlockMove = () => {
//       console.log("added onBlockMove");

//       function onMouseMove(evt: MouseEvent) {
//         canvas.moveBlock(
//           evt.pageX - block.clientWidth / 2,
//           evt.pageY - block.clientHeight / 2,
//           id
//         );
//       }

//       function remove() {
//         block.removeEventListener("mousemove", onMouseMove);
//         block.onmouseup = null;
//       }

//       block.addEventListener("mousemove", onMouseMove);
//       block.addEventListener("mouseup", remove);
//     };
//     block.addEventListener("mousedown", drag(block));
//     block.addEventListener("mousedown", onBlockMove);
//   };
// }

function moveBlockOnMap(id: number, block: HTMLElement) {
  console.log("added onBlockMove");
  function onBlockMove() {
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
  }
  block.addEventListener("mousedown", drag(block));
  block.addEventListener("mousedown", onBlockMove);
}

function dragToCreateHandler(node: HTMLElement) {
  return function (evt: MouseEvent) {
    console.log("called dragTo crate");

    const copy = node.cloneNode(true) as HTMLElement;

    function moveUnderCursor(pageX: number, pageY: number) {
      copy.style.left = pageX - copy.offsetWidth / 2 + "px";
      copy.style.top = pageY - copy.offsetHeight / 2 + "px";
    }

    function onMouseMove(event: MouseEvent) {
      moveUnderCursor(event.pageX, event.pageY);
    }

    function appendToBlock() {
      console.log("appended");
      // console.log(evt);

      document.removeEventListener("mousemove", onMouseMove);
      const container = document.querySelector(".container");
      container?.appendChild(copy);
      const id = createId();
      const blockX = copy.offsetLeft;
      const blockY = copy.offsetTop;

      const color = window
        .getComputedStyle(copy, null)
        .getPropertyValue("background-color");
      canvas.drawBlock(
        blockX,
        blockY,
        copy.clientWidth,
        copy.clientHeight,
        color,
        id
      );
      moveBlockOnMap(id, copy);
      // copy.addEventListener("mousedown", drag(copy));
      copy.removeEventListener("mouseup", appendToBlock);
      // copy.onmouseup = null;
    }

    copy.style.position = "absolute";
    copy.style.zIndex = "1000";

    document.body.append(copy);

    moveUnderCursor(evt.pageX, evt.pageY);

    document.addEventListener("mousemove", onMouseMove);

    copy.addEventListener("mouseup", appendToBlock);
  };
}

// const dragToCreateHandler = (evt) => {
//   const copy = evt.target.cloneNode(true);
//   console.log(copy);
//   document.body.append(copy);
//   const blockStore = document.querySelector(".blocks-store");
//   blockStore?.append(copy);

//   copy.addEventListener("mousemove", drag(copy));
// };

// const onButtonClickHandler = () => {
//   const block = createBlock("div", "block", "I am a block");
//   const container = document.querySelector(".container");
//   container?.appendChild(block);
//   const id = createId();
//   const blockX = block.offsetLeft;
//   const blockY = block.offsetTop;

//   canvas.drawBlock(blockX, blockY, block.clientWidth, block.clientHeight, id);

//   const onBlockMove = () => {
//     function onMouseMove(evt: MouseEvent) {
//       canvas.moveBlock(
//         evt.pageX - block.clientWidth / 2,
//         evt.pageY - block.clientHeight / 2,
//         id
//       );
//     }

//     function remove() {
//       block.removeEventListener("mousemove", onMouseMove);
//       block.onmouseup = null;
//     }

//     block.addEventListener("mousemove", onMouseMove);
//     block.addEventListener("mouseup", remove);
//   };
//   block.addEventListener("mousedown", drag(block));
//   block.addEventListener("mousedown", onBlockMove);
// };

function app() {
  console.log("hello world");
  const title = `Hello World`;
  const block = document.createElement("h1");
  block.innerHTML = title;

  const rootDiv = document.getElementById("root");

  const container = createBlock("div", "container");

  const blocksStore = createBlock("div", "blocks-store");
  container.append(blocksStore);

  const blocksContainer = createBlock("div", "blocks-container");
  blocksContainer?.appendChild(block);
  container.append(blocksContainer);
  rootDiv?.appendChild(container);

  const draggableBlock = createBlock("div", "block", "I am a block");
  const draggableBlock2 = createBlock(
    "div",
    ["block", "block--green"],
    "I am a block - 2"
  );
  draggableBlock.addEventListener(
    "mousedown",
    dragToCreateHandler(draggableBlock)
  );
  draggableBlock2.addEventListener(
    "mousedown",
    dragToCreateHandler(draggableBlock2)
  );

  // const container = document.querySelector(".container");
  blocksStore?.appendChild(draggableBlock);
  blocksStore?.appendChild(draggableBlock2);
}

app();
