import { ITabService } from "../interface/TabService.interface";
import { ListPage } from "./ListPage";

export type PAGES = "list" | "settings";
interface AppProps {
  tabService: ITabService;
}
export function App({ tabService }: AppProps) {
  return <ListPage tabService={tabService} />;
}
