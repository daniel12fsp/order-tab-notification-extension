import "reset-css/reset.css";

import { useEffect, useState, useMemo, useCallback } from "react";
import { createRoot } from "react-dom/client";

import * as React from "react";
import { NoPriorityTabs } from "./styles";
import { List, ListItem } from "./components/List";

import { createGlobalStyle } from "styled-components";

// create theme dark or light
const GlobalStyle = createGlobalStyle`
  body {
    color: #222;
    background: #fff;
    font-family: sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    body {
      color: #eee;
      background: #121212;
    }
  }
`;

const selectTabs = [
  "calendar.google.com",
  "teams.microsoft.com",
  "web.whatsapp.com",
  "mail.google.com",
  "mail.yahoo.com",
  "mybeehome.com",
  "messages.google.com",
];

export function App() {
  const [tabs, setTabs] = useState([]);
  const [priority, setPriority] = useState({});

  useEffect(() => {
    function updateTab(tabId, changeInfo, updatedTab) {
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

    const filter = {
      properties: ["attention", "favIconUrl", "title"],
    };
    browser.tabs.onUpdated.addListener(updateTab, filter);
    browser.tabs.query({ currentWindow: true }).then((tabs) => setTabs(tabs));
    return () => browser.tabs.onUpdated.removeListener(updateTab);
  }, []);

  useEffect(() => {
    function updateTab(activeInfo) {
      setPriority((prevState) => ({
        ...prevState,
        [activeInfo.tabId]: 0,
      }));
    }
    browser.tabs.onActivated.addListener(updateTab);
    return () => browser.tabs.onActivated.removeListener(updateTab);
  }, []);

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

  useEffect(() => {
    function goToPriorityTab(command) {
      if (command === "go_to_priority_tab") {
        console.log("go_to_priority_tab", priorityTabs.length);
        if (priorityTabs.length > 0) {
          browser.tabs.update(priorityTabs[0].id, { active: true });
        }
      }
    }
    browser.commands.onCommand.addListener(goToPriorityTab);
    return () => browser.commands.onCommand.removeListener(goToPriorityTab);
  }, [priorityTabs]);

  function renderPriorityTabs() {
    if (priorityTabs.length === 0)
      return <NoPriorityTabs>Sem tabs com prioridades</NoPriorityTabs>;
    return (
      <List>
        {priorityTabs.map((tab) => (
          <ListItem
            key={tab.id}
            icon={tab.favIconUrl}
            title={tab.title}
            subtitle={tab.url}
            onClick={onClick(tab)}
          ></ListItem>
        ))}
      </List>
    );
  }
  return (
    <>
      <GlobalStyle />
      {renderPriorityTabs()}
      {<hr />}
      <List>
        {normalTabs.map((tab) => (
          <ListItem
            key={tab.id}
            icon={tab.favIconUrl}
            title={tab.title}
            subtitle={tab.url}
            onClick={onClick(tab)}
            enable={tab.active}
          ></ListItem>
        ))}
      </List>
    </>
  );
}

const rootElem = document.getElementById("rootElem");
if (rootElem) {
  rootElem.remove();
}

const newRootElem = document.createElement("div");
newRootElem.id = "rootElem";
document.body.appendChild(newRootElem);

const root = createRoot(newRootElem);
root.render(<App />);
