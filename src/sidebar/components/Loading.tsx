import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const loadingAnimation = keyframes`
0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const SubContainer = styled.div`
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: ${loadingAnimation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

export function Loading() {
  return (
    <Container>
      <SubContainer></SubContainer>
    </Container>
  );
}
