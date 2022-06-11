import { ITabService } from "../interface/TabService.interface";
import { mockedTabs } from "../mocked/mockedTabs";

export class MockTabService implements ITabService {
  get() {
    return Promise.resolve(mockedTabs);
  }

  onUpdated(_onUpdatedTab, _filter) {
    return () => {};
  }

  update(_id: number, _obj: any) {
    return Promise.resolve();
  }
}
