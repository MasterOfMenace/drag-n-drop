export default function createBlock(
  tag: string,
  classNames: string | string[],
  innerText: string | null | undefined = null
) {
  const block = document.createElement(tag);
  if (classNames) {
    if (typeof classNames === "string") {
      block.classList.add(classNames);
    } else if (Array.isArray(classNames)) {
      for (let name of classNames) {
        block.classList.add(name);
      }
    } else {
      throw new Error("ClassName must be an string or array instance");
    }
  }

  if (innerText) {
    block.innerHTML = innerText;
  }
  return block;
}
