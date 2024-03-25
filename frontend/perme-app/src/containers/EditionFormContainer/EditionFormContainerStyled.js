import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textlight } from "../../utils/colors";

export const FisioRegisterForm = styled.form`
  margin: auto;
  max-width: ${toRem(1170)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${toRem(500)};
  background-color: ${textlight};
  @media (max-width: 768px) {
    margin: ${toRem(10)};
    height: ${toRem(800)};
  }
  `;

export const FullNameContent = styled.div`
    display: flex;
    gap: 15px;
    padding: ${toRem(30)} 0 ${toRem(20)} 0;
    align-items: stretch;
    justify-content: space-between;
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
  }
`;

export const AuthenticationContainer = styled.div`
    display: flex;
    gap: 15px;
    padding: ${toRem(30)} 0 ${toRem(20)} 0;
    align-items: stretch;
    justify-content: space-between;
    > *:nth-child(1) {
    flex: 1;
  }
  > *:nth-child(2) {
    flex: 1;
  }
  @media (max-width: 768px) {
    flex-direction: column ;
    padding: 0 0 ${toRem(20)} 0;
    gap: 20px;
 }
  `;

export const ButtonContainer = styled.div`
    display: flex;
    padding: ${toRem(50)} 0 0 0;
    justify-content: end;
    @media (max-width: 768px) { 
    
      padding: ${toRem(40)} 0 0 0;
 }
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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