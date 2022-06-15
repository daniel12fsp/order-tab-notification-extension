import { ITabService } from "../interface/TabService.interface";
import { BrowserTabService } from "../services/BrowserTab.service";
import isFirefoxExtensionEnverioment from "../services/isFirefoxExtensionEnverioment";
import { BrowserVariableFactory } from "./browser.factory";
export class TabServiceFactory {
  static async create(): Promise<ITabService> {
    if (
      process.env.NODE_ENV === "production" &&
      isFirefoxExtensionEnverioment()
    ) {
      const browser = BrowserVariableFactory.create();
      return new BrowserTabService(browser);
    }
    if (process.env.NODE_ENV === "development") {
      const { MockTabService } = await import("../services/MockTab.service");
      return new MockTabService();
    }
    throw new Error(
      `TabService is not implemented for enverioment ${process.env.NODE_ENV}`
    );
  }
}
