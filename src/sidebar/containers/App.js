import "reset-css/reset.css";

import { useEffect, useState, useMemo, useCallback } from "react";

import * as React from "react";
import { TabList } from "../components/TabList";
import { detectTabWithCounter } from "../services/detectTabWithCounter";

const selectTabs = [
  "calendar.google.com",
  "teams.microsoft.com",
  "web.whatsapp.com",
  "mail.google.com",
  "mail.yahoo.com",
  "mybeehome.com",
  "messages.google.com",
];

function onActivatedTabHook(onActivatedTab) {
  useEffect(() => {
    console.log("onActivatedTabHook");
    browser.tabs.onActivated.addListener(onActivatedTab);
    return () => browser.tabs.onActivated.removeListener(onActivatedTab);
  }, []);
}

function onUpdatedTabHook(onUpdatedTab, filter) {
  useEffect(() => {
    console.log("onUpdatedTabHook");
    browser.tabs.onUpdated.addListener(onUpdatedTab, filter);
    return () => browser.tabs.onUpdated.removeListener(onUpdatedTab);
  });
}

function getInitialTabs(setTabs) {
  useEffect(() => {
    console.log("getInitialTabs");
    browser.tabs.query({ currentWindow: true }).then(setTabs);
  }, []);
}

function handleShotcut(priorityTabs) {
  useEffect(() => {
    console.log("handleShotcut");
    function goToPriorityTab(command) {
      if (command === "go_to_priority_tab") {
        if (priorityTabs.length > 0) {
          browser.tabs.update(priorityTabs[0].id, { active: true });
        }
      }
    }
    browser.commands.onCommand.addListener(goToPriorityTab);
    return () => browser.commands.onCommand.removeListener(goToPriorityTab);
  }, [priorityTabs]);
}

export function App() {
  const [tabs, setTabs] = useState([]);
  const [priority, setPriority] = useState({});

  const filter = {
    properties: ["attention", "favIconUrl", "title"],
  };

  getInitialTabs(setTabs);

  useEffect(() => {
    const tabsWithCounter = detectTabWithCounter(tabs);
    if (tabsWithCounter.length === 0) {
      return;
    }
    setPriority((prevState) => {
      const newState = { ...prevState };
      for (let i = 0; i < tabsWithCounter.length; i++) {
        const tabId = tabsWithCounter[i];
        newState[tabId] = (newState[tabId] || 0) + 1;
      }
      return newState;
    });
  }, [tabs]);

  onUpdatedTabHook((tabId, changeInfo, updatedTab) => {
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
  }, filter);

  onActivatedTabHook((activeInfo) => {
    setPriority((prevState) => ({
      ...prevState,
      [activeInfo.tabId]: 0,
    }));
  });

  const orderTabs = useMemo(() => {
    const orderTabs = [...tabs].filter((tab) =>
      selectTabs.find((selectTab) => tab.url.includes(selectTab))
    );
    orderTabs
      .sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase())
      .sort((a, b) => (priority[b.id] || 0) - (priority[a.id] || 0));
    return orderTabs;
  }, [priority, tabs]);

  const onClick = useCallback((tab) => () => {
    browser.tabs.update(tab.id, {
      active: true,
    });
    setPriority((prevState) => ({
      ...prevState,
      [tab.id]: 0,
    }));
  });

  const { priorityTabs, normalTabs } = useMemo(() => {
    const priorityTabs = orderTabs.filter((tab) => priority[tab.id] > 0);
    const normalTabs = orderTabs.filter(
      (tab) => priority[tab.id] === 0 || !priority[tab.id]
    );

    return { priorityTabs, normalTabs };
  }, [priority, tabs, orderTabs]);

  handleShotcut(priorityTabs);

  return (
    <TabList
      priorityTabs={priorityTabs}
      onClick={onClick}
      normalTabs={normalTabs}
    />
  );
}
