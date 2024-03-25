import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textlight } from "../../utils/colors";

export const PatientRegisterForm = styled.form`
  padding: ${toRem(70)} ${toRem(0)} ${toRem(0)} ${toRem(136)};
  max-width: ${toRem(482)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${toRem(450)};
  background-color: ${textlight};
  @media (max-width: 768px) { 
      padding: ${toRem(70)} ${toRem(10)} ${toRem(0)} ${toRem(10)};
      text-align: center;
      max-width: 100%;
      height: ${toRem(500)}; 
  }
  `;

export const DateContent = styled.div`
    display:flex;
    align-items: flex-start;
`;

export const ButtonContainer = styled.div`
    display: flex;
    padding: 20px 0 0 0;
    justify-content: end;
`