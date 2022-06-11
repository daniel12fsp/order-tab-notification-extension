import styled from "styled-components";
import { CompactList, CompactListItem } from "./CompactList";

export const NoPriorityTabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  text-align: center;
`;

const label = {
  "calendar.google.com": (tab) => {
    switch (tab.cookieStoreId) {
      case "firefox-default":
        return "work";
      case "firefox-container-1":
        return "my";
    }
  },
  "mail.yahoo.com": (tab) => {
    if (tab.title) {
      const result = tab.title.match(/(\w+)@/g);
      if (result) {
        return result[0].slice(0, -1);
      }
    }
    return "";
  },
  "mail.google.com": (tab) => {
    switch (tab.cookieStoreId) {
      case "firefox-default":
        return "work";
      case "firefox-container-1":
        return "my";
    }
  },
};

export function CompactTabList({
  priorityTabs,
  onClick,
  normalTabs,
  priority,
}) {
  return (
    <CompactList>
      {[...priorityTabs, ...normalTabs].map((tab) => {
        const { hostname } = new URL(tab.url);
        const func = label[hostname] || (() => {});

        return (
          <CompactListItem
            key={tab.id}
            icon={tab.favIconUrl}
            title={tab.title}
            onClick={onClick(tab)}
            notification={(priority[tab.id] || 0) > 0}
            label={func(tab)}
          />
        );
      })}
    </CompactList>
  );
}
