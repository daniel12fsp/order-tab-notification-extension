import { ITab } from "../interface/Tab.interface";
import {
  ITabService,
  OnUpdatedCallBack,
} from "../interface/TabService.interface";

export class BrowserTabService implements ITabService {
  constructor(private browser) {}
  onCreated(callback: (tab: ITab) => void): () => void {
    this.browser.tabs.onCreated.addListener(callback);
    return () => {
      this.browser.tabs.onCreated.removeListener(callback);
    };
  }

  onRemoved(callback: (tabId: number) => void): () => void {
    this.browser.tabs.onRemoved.addListener(callback);
    return () => {
      this.browser.tabs.onRemoved.removeListener(callback);
    };
  }

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
