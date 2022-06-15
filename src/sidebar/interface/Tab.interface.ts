export interface ITab {
  id: number;
  index: number;
  windowId: number;
  highlighted: boolean;
  active: boolean;
  attention: boolean;
  pinned: boolean;
  status: "complete" | "loading";
  hidden: boolean;
  discarded: boolean;
  incognito: boolean;
  width: number;
  height: number;
  lastAccessed: number;
  audible: boolean;
  mutedInfo: MutedInfo;
  isArticle?: boolean;
  isInReaderMode: boolean;
  sharingState: SharingState;
  successorTabId: number;
  cookieStoreId: string;
  url: string;
  title: string;
  favIconUrl: string;
  openerTabId?: number;
}

export interface MutedInfo {
  muted: boolean;
}

export interface SharingState {
  camera: boolean;
  microphone: boolean;
}
