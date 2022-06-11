import { Settings } from "../interface/Settings";
import { Database } from "./Database.interface";

export class SettingsBrowserStorageRepo implements Database<Settings> {
  browser: any;
  constructor(browser: any) {
    this.browser = browser;
  }

  async get(): Promise<Settings> {
    return this.browser.storage.local.get();
  }

  async set(field, value): Promise<void> {
    const settings = await this.get();
    settings[field] = value;
    this.setAll(settings);
  }

  setAll(settings: Settings): Promise<void> {
    return this.browser.storage.local.set(settings);
  }
}
