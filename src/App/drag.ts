export default function drag(node: HTMLElement) {
  return function onMouseDown(evt: MouseEvent) {
    console.log("added drag");
    function moveUnderCursor(pageX: number, pageY: number) {
      node.style.left = pageX - node.offsetWidth / 2 + "px";
      node.style.top = pageY - node.offsetHeight / 2 + "px";
    }

    function onMouseMove(event: MouseEvent) {
      moveUnderCursor(event.pageX, event.pageY);
    }

    function remove() {
      console.log("removed");

      document.removeEventListener("mousemove", onMouseMove);
      node.onmouseup = null;
    }

    node.style.position = "absolute";
    node.style.zIndex = "1000";

    document.body.append(node);

    moveUnderCursor(evt.pageX, evt.pageY);

    document.addEventListener("mousemove", onMouseMove);

    node.addEventListener("mouseup", remove);
  };
}
