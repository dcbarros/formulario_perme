import styled from "styled-components";

export const FormContentStyled = styled.div`
  align-items: start;
  justify-content: start;
  display: flex;
  flex-direction: column;
  width: 100%;

  &.comInputRadio {
    flex-direction: row;
    align-items: center;
    max-width: 100%;

    &.first-row {
      order: 1; 
    }

    &.second-row {
      order: 2; 
    }
  }
`;

