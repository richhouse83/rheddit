import * as styled from "styled-components";

const GlobalStyle = styled.createGlobalStyle`
  .App {
    text-align: center;
    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.bgColor};
    border: solid 2px red;
    height: 100vh;
  }
`;

export default GlobalStyle;
