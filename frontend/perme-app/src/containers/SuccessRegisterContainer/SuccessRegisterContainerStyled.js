import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textlight } from "../../utils/colors";

export const SuccessRegisterStyled = styled.form`
  margin: ${toRem(160)} auto;
  align-items: center;
  max-width: ${toRem(482)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${toRem(160)};
  background-color: ${textlight};
  @media (max-width: 768px) { 
      padding: ${toRem(10)};
      height: ${toRem(300)};
      text-align: center;
     
  }
  `;