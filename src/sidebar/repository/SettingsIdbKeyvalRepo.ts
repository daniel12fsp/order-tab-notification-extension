import { Settings } from "../interface/Settings";
import { Database } from "./Database.interface";
import * as IdbKeyval from "idb-keyval";

export class SettingsIdbKeyvalRepo implements Database<Settings> {
  async get(): Promise<Settings> {
    return IdbKeyval.get("settings");
  }

  async set(field, value): Promise<void> {
    const settings = await this.get();
    settings[field] = value;
    this.setAll(settings);
  }

  setAll(settings: Settings): Promise<void> {
    console.log("setAll", settings);
    return IdbKeyval.set("settings", settings);
  }
}
