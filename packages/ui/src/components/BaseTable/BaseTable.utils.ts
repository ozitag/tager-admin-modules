function getAllParents(element: HTMLElement): Array<HTMLElement> {
  let currentElement = element;
  const parentList: Array<HTMLElement> = [];

  while (currentElement.parentElement) {
    parentList.push(currentElement.parentElement);
    currentElement = currentElement.parentElement;
  }

  return parentList;
}

function getComputedStyleProp(element: HTMLElement, prop: string) {
  return window.getComputedStyle(element).getPropertyValue(prop);
}

function isElementScrollable(element: HTMLElement): boolean {
  const overflowPropValues = [
    getComputedStyleProp(element, "overflow"),
    getComputedStyleProp(element, "overflow-y"),
    getComputedStyleProp(element, "overflow-x"),
  ];

  return overflowPropValues.some(
    (overflowValue) => overflowValue === "auto" || overflowValue === "scroll"
  );
}

function isElementScrollableVertically(element: HTMLElement): boolean {
  const overflowValue = getComputedStyleProp(element, "overflow-y");

  return overflowValue === "auto" || overflowValue === "scroll";
}

export function getScrollParentElements(element: HTMLElement): {
  firstVerticalScrollParentElement: HTMLElement;
  scrollParentElements: Array<HTMLElement>;
} {
  const scrollParentElements =
    getAllParents(element).filter(isElementScrollable);

  const firstVerticalScrollParentElement =
    scrollParentElements.find(isElementScrollableVertically) ?? document.body;

  return {
    firstVerticalScrollParentElement,
    scrollParentElements: [...scrollParentElements, document.body],
  };
}
