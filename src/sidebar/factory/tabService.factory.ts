import { ITabService } from "../interface/TabService.interface";
import { BrowserTabService } from "../services/BrowserTab.service";
import isFirefoxExtensionEnverioment from "../services/isFirefoxExtensionEnverioment";
import { MockTabService } from "../services/MockTab.service";
import { BrowserVariableFactory } from "./browser.factory";

export class TabServiceFactory {
  static create(): ITabService {
    if (isFirefoxExtensionEnverioment()) {
      const browser = BrowserVariableFactory.create();
      return new BrowserTabService(browser);
    }
    return new MockTabService();
  }
}
