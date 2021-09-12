export default function createBlock(
  tag: string,
  className: string,
  innerText: string | null | undefined = null
) {
  const block = document.createElement(tag);
  if (className) {
    block.classList.add(className);
  }

  if (innerText) {
    block.innerHTML = innerText;
  }
  return block;
}
