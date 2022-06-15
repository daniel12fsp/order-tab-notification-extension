import { useEffect, useState, useMemo, useCallback } from "react";
import { detectTabWithCounter } from "../services/detectTabWithCounter";
import { CompactTabList } from "../components/CompactTabList";
import { TabServiceFactory } from "../factory/tabService.factory";
import { ITab } from "../interface/Tab.interface";

// TODO make selectTabs be configurable
const selectTabs = [
  "calendar.google.com",
  "teams.microsoft.com",
  "web.whatsapp.com",
  "mail.google.com",
  "mail.yahoo.com",
  "mybeehome.com",
  "messages.google.com",
];

const tabService = TabServiceFactory.create();

export type Priorities = Record<string, number>;

export function ListPage() {
  const [tabs, setTabs] = useState<ITab[]>([]);
  const [priorities, setPriorities] = useState<Priorities>({});

  const filter: Record<string, any> = {
    properties: ["attention", "favIconUrl", "title", "status"],
  };

  useEffect(() => {
    function onUpdatedTab(tabId: number, _changeInfo: {}, updatedTab: ITab) {
      console.log("onUpdatedTab", { tabId, _changeInfo, updatedTab });

      setPriorities((prevState) => {
        const priority = (prevState[tabId] || 0) + 1;
        const newPriority =
          updatedTab.active && updatedTab.status === "complete" ? 0 : priority;
        return {
          ...prevState,
          [tabId]: newPriority,
        };
      });

      setTabs((tabs) =>
        tabs.map((tab) => {
          if (tab.id === tabId) {
            return updatedTab;
          }
          return tab;
        })
      );
    }
    const removeListener = tabService.onUpdated(onUpdatedTab, filter);
    return () => removeListener();
  }, []);

  useEffect(() => {
    tabService.get().then(setTabs);

    const onCreatedCallback = () => {
      tabService.get().then(setTabs);
    };

    const onRemovedCallback = (tabId: number) => {
      setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    };

    const removeListeneronCreated = tabService.onCreated(onCreatedCallback);
    const removeListeneronRemoved = tabService.onRemoved(onRemovedCallback);
    return () => {
      removeListeneronCreated();
      removeListeneronRemoved();
    };
  }, []);

  useEffect(() => {
    const tabsWithCounter = detectTabWithCounter(tabs);
    if (tabsWithCounter.length === 0) {
      return;
    }
    setPriorities((prevState) => {
      const newState = { ...prevState };
      for (const tabId of tabsWithCounter) {
        newState[tabId] = (newState[tabId] || 0) + 1;
      }
      return newState;
    });
  }, [tabs]);

  const seletedTabs = useMemo(() => {
    const seletedTabs = [...tabs].filter((tab) =>
      selectTabs.find((selectTab) => tab.url.includes(selectTab))
    );
    return seletedTabs;
  }, [tabs]);

  const onClick = useCallback(
    (tab) => () => {
      tabService
        .update(tab.id, {
          active: true,
        })
        .then(() => {
          setPriorities((prevState) => ({
            ...prevState,
            [tab.id]: 0,
          }));
        });
    },
    []
  );

  return (
    <CompactTabList
      tabs={seletedTabs}
      onClick={onClick}
      priority={priorities}
    />
  );
}
