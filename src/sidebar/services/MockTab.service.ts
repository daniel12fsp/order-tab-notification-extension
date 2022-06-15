import { ITab } from "../interface/Tab.interface";
import { ITabService } from "../interface/TabService.interface";
import { mockedTabs } from "../mocked/mockedTabs";

export class MockTabService implements ITabService {
  onCreated(_callback: (tab: ITab) => void) {
    return () => {};
  }

  onRemoved(_callback: (tabId: number) => void) {
    return () => {};
  }

  get(): Promise<ITab[]> {
    return Promise.resolve(mockedTabs);
  }

  onUpdated(_onUpdatedTab, _filter) {
    return () => {};
  }

  update(_id: number, _obj: any) {
    return Promise.resolve();
  }
}
