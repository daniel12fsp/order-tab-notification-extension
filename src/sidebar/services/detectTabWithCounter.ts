export function detectTabWithCounter(tabs: ITab[]) {
  return tabs.filter((tab) => tab.title.match(/\(\d+/)).map(({ id }) => id);
}
