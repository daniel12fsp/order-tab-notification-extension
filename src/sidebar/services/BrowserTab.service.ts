import {
  ITabService,
  OnUpdatedCallBack,
} from "../interface/TabService.interface";

export class BrowserTabService implements ITabService {
  constructor(private browser) {}

  get() {
    return this.browser.tabs.query({ currentWindow: true });
  }

  onUpdated(onUpdatedTab: OnUpdatedCallBack, filter: Record<string, string>) {
    this.browser.tabs.onUpdated.addListener(onUpdatedTab, filter);
    return () => {
      this.browser.tabs.onUpdated.removeListener(onUpdatedTab);
    };
  }

  update(id: number, tab: Partial<ITab>) {
    return this.browser.tabs.update(id, tab);
  }
}
