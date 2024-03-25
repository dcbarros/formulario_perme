import styled from "styled-components";

export const LoginPageStyled = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  margin: 0; 
  padding: 0;
  overflow: hidden;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
 } 
  `;

export const ImageContainer = styled.div`
width: 100%;
@media (max-width: 768px) {
    display: none;
 } 
`