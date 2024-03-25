import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textlight } from "../../utils/colors";

export const FisioRegisterForm = styled.form`
  margin: auto;
  max-width: ${toRem(656)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${toRem(350)};
  background-color: ${textlight};
  padding: ${toRem(70)} 0 0 0;
  @media (max-width: 768px) {
    flex-direction: column ;
    padding: ${toRem(70)} ${toRem(10)};
    height: ${toRem(700)};
 } 
  `;

export const FullNameContent = styled.div`
    display: flex;
    gap: 8px;
    padding: ${toRem(20)} 0 ${toRem(15)} 0;
    align-items: stretch;
    > *:nth-child(1) {
    flex: 1;
  }
  > *:nth-child(2) {
    flex: 1;
  }
  > *:nth-child(3) {
    flex: 1;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: ${toRem(30)} 0 0 0;
 }  
`;

export const AuthenticationContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: ${toRem(15)} 0 0 0;
    justify-content: space-between;
    align-items: stretch;
    > *:nth-child(1) {
    flex: 1;
  }
  > *:nth-child(2) {
    flex: 1;
  }
  @media (max-width: 768px) {
    flex-direction: column ;
    padding: ${toRem(10)} 0 0 0;
 } 
`;

export const ButtonContainer = styled.div`
    display: flex;
    padding: ${toRem(50)} 0 0 0;
    justify-content: end;
`
export const EyeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border: 0;
  margin: 0;
  max-width: 36px;
  height: 60px;
  justify-content: space-between;
  align-items: flex-start;
  > *:nth-child(1) {
    color: transparent;
  }
`

export const Password = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: stretch;
    > *:nth-child(1) {
    flex: 1;
  }
  > *:nth-child(2) {
    flex: 1;
    font-size: 18px ;
    color: #008ea7;
  }

`

