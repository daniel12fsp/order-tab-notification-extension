import { ITab } from "./Tab.interface";

export type OnUpdatedCallBack = (
  tabId: number,
  _changeInfo: {},
  updatedTab: ITab
) => void;
export interface ITabService {
  get: () => Promise<ITab[]>;
  onUpdated: (
    onUpdated: OnUpdatedCallBack,
    filter: Record<string, any>
  ) => () => void;
  onCreated: (callback: (tab?: ITab) => void) => () => void;
  onRemoved: (callback: (tabId: number) => void) => () => void;
  update: (id: number, tab: Partial<ITab>) => Promise<void>;
}
