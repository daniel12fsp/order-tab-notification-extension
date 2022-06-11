import isFirefoxExtensionEnverioment from "../services/isFirefoxExtensionEnverioment";

export class BrowserVariableFactory {
  static create() {
    if (isFirefoxExtensionEnverioment()) {
      return window.browser;
    }
    throw new Error("Browser variable is only valid for Firefox extension");
  }
}
