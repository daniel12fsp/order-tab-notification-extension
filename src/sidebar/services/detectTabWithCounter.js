export function detectTabWithCounter(tabs) {
  return tabs.filter((tab) => tab.title.match(/\([0-9]+/)).map(({ id }) => id);
}
