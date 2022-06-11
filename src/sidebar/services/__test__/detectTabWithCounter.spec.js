import { detectTabWithCounter } from "../detectTabWithCounter";
import { createMockedTab } from "./mocked-tabs";

describe("Test detectTabWithCounter", () => {
  it("When one tabs is with counter must return tab id", () => {
    const tabs = [
      { id: 1, title: "(1 unread) - fake@fake.com - Yahoo Mail" },
      { id: 2, title: "Caixa de entrada - fake@fake.com - E-mail de fake" },
      { id: 3, title: "(1) WhatsApp" },
    ].map(createMockedTab);
    const result = detectTabWithCounter(tabs);
    expect(result).toEqual([1, 3]);
  });

  it("When no exist tabs with counter must return empty", () => {
    const tabs = [
      { id: 1, title: "Google" },
      { id: 2, title: "Caixa de entrada - fake@fake.com - E-mail de fake" },
    ].map(createMockedTab);
    const result = detectTabWithCounter(tabs);
    expect(result).toEqual([]);
  });
});
