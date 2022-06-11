import { useEffect, useState, useMemo, useCallback } from "react";
import { detectTabWithCounter } from "../services/detectTabWithCounter";
import { CompactTabList } from "../components/CompactTabList";
import { TabServiceFactory } from "../factory/tabService.factory";

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

function sortString(n1: string, n2: string) {
  if (n1 > n2) {
    return 1;
  }
  if (n1 < n2) {
    return -1;
  }
  return 0;
}

export function ListPage() {
  const [tabs, setTabs] = useState<ITab[]>([]);
  const [priority, setPriority] = useState<Record<string, number>>({});

  const filter: Record<string, any> = {
    properties: ["attention", "favIconUrl", "title"],
  };

  useEffect(() => {
    function onUpdatedTab(tabId: number, _changeInfo: {}, updatedTab: ITab) {
      console.log("onUpdatedTab", { tabId, _changeInfo, updatedTab });
      setPriority((prevState) => {
        const priority = (prevState[tabId] || 0) + 1;
        const newPriority = updatedTab.active ? 0 : priority;
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
  }, []);

  useEffect(() => {
    const tabsWithCounter = detectTabWithCounter(tabs);
    if (tabsWithCounter.length === 0) {
      return;
    }
    setPriority((prevState) => {
      const newState = { ...prevState };
      for (const tabId of tabsWithCounter) {
        newState[tabId] = (newState[tabId] || 0) + 1;
      }
      return newState;
    });
  }, [tabs]);

  const orderTabs = useMemo(() => {
    const orderTabs = [...tabs].filter((tab) =>
      selectTabs.find((selectTab) => tab.url.includes(selectTab))
    );
    orderTabs
      .sort((a, b) => sortString(a.title.toLowerCase(), b.title.toLowerCase()))
      .sort((a, b) => (priority[b.id] || 0) - (priority[a.id] || 0));
    return orderTabs;
  }, [priority, tabs]);

  const onClick = useCallback(
    (tab) => () => {
      tabService
        .update(tab.id, {
          active: true,
        })
        .then(() => {
          setPriority((prevState) => ({
            ...prevState,
            [tab.id]: 0,
          }));
        });
    },
    []
  );

  const { priorityTabs, normalTabs } = useMemo(() => {
    const priorityTabs = orderTabs.filter((tab) => priority[tab.id] > 0);
    const normalTabs = orderTabs.filter(
      (tab) => priority[tab.id] === 0 || !priority[tab.id]
    );

    return { priorityTabs, normalTabs };
  }, [priority, tabs, orderTabs]);

  return (
    <CompactTabList
      priorityTabs={priorityTabs}
      onClick={onClick}
      normalTabs={normalTabs}
      priority={priority}
    />
  );
}
