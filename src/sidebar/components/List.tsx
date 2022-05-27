import styled from "styled-components";

const Ul = styled.ul``;

export function List({ children }) {
  return <Ul>{children}</Ul>;
}

const Icon = styled.img`
  width: 36px;
  height: 36px;
`;

const ListItemContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 20px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background-color: #443355;
  }
`;

const TextContainer = styled.div`
  padding: 0 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 10px;
`;

const Subtitle = styled.div`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function ListItem({ icon, title, subtitle, onClick }) {
  return (
    <ListItemContainer onClick={onClick}>
      <Icon src={icon} />
      <TextContainer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TextContainer>
    </ListItemContainer>
  );
}
