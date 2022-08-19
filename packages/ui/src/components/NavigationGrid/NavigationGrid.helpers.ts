import type { NavigationGridItem } from "./NavigationGrid.types";

export function hasContent(navItem: NavigationGridItem): boolean {
  const hasLinkList =
    Array.isArray(navItem.linkList) && navItem.linkList.length > 0;

  return Boolean(navItem.total) || hasLinkList;
}

export function hasNameOnly(navItem: NavigationGridItem): boolean {
  return !hasContent(navItem);
}

export function formatNumber(number: number) {
  const parts = String(number).split(".");
  parts[0] = (parts[0] || "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

export function getWidth(navItem: NavigationGridItem) {
  const value = navItem.width ? navItem.width : 33.3333333;
  return `${value}%`;
}
