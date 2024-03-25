import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textlight } from "../../utils/colors";

export const LoginContainerStyled = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;  
  height: 100vh;
  padding: ${toRem(0)} ${toRem(124)};
  background: ${textlight}; 

  @media (max-width: 768px) {
    padding: ${toRem(50)} ${toRem(10)} 0 ${toRem(10)} ;
    height: 60vh;
    > *:nth-child(1) {
    flex: 1;
    text-align: center;
    align-items: center;
 } 
}
`;

export const InputLine = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${toRem(464)};
  margin-top: ${toRem(16)};
`;

export const LogoLine = styled.div`
  display: flex;
  max-width: ${toRem(464)};
  margin-bottom: ${toRem(16)};
  @media (max-width: 768px) {
    padding: 0 
  }
 
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${toRem(16)};
  max-width: ${toRem(464)};
`;
