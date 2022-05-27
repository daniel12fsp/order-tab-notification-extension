import styled from "styled-components";
import { List, ListItem } from "./List";

export const NoPriorityTabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;

function PriorityTabs({ priorityTabs, onClick }) {
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
export function TabList({ priorityTabs, onClick, normalTabs }) {
  return (
    <>
      <PriorityTabs priorityTabs={priorityTabs} onClick={onClick} />
      <hr />
      <List>
        {normalTabs.map((tab) => (
          <ListItem
            key={tab.id}
            icon={tab.favIconUrl}
            title={tab.title}
            subtitle={tab.url}
            onClick={onClick(tab)}
          />
        ))}
      </List>
    </>
  );
}
