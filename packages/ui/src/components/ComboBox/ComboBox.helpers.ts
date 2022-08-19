// TODO align option center vertically
export function scrollOptionIntoView(optionElement: HTMLElement): void {
  const menuElement = optionElement.parentElement;

  if (!menuElement) return;

  const top = optionElement.offsetTop + menuElement.offsetTop;

  const bottom = top + optionElement.offsetHeight;
  const viewRectTop = menuElement.scrollTop;
  const viewRectBottom = viewRectTop + menuElement.clientHeight;

  if (top < viewRectTop) {
    menuElement.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    menuElement.scrollTop = bottom - menuElement.clientHeight;
  }
}
