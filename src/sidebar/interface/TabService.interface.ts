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
  ) => void;
  update: (id: number, tab: ITab) => Promise<void>;
}
