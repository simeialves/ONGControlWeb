import styled from "styled-components"

const Container = styled.div`
  height: 100%;
  display: flex;
  box-shadow: 0 0 20px 3px;
  > svg {
    position: fixed;
    color: black;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }
  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }
`;

export const Content = styled.div`
  margin-top: 100px;
`;


export default Container