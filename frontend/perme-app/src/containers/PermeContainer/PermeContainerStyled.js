import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textlight } from "../../utils/colors";

export const PermeContainerStyled = styled.div`
  background-color: ${textlight};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: ${toRem(1170)};
  margin: ${toRem(50)} auto;
  @media (max-width: 768px) {
    padding: ${toRem(10)};
    }
`
export const ProtocolContainer = styled.ul`
  background-color: ${textlight};
  padding: ${toRem(15)};
  margin: ${toRem(30)} 0;
  border: 1px solid #808080;
  border-radius: 8px; 
  `;

export const OptionsContainer = styled.ul`
  background-color: ${textlight};
  padding: 0;
  margin: 0;
  `;

export const OptionsList = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  font-size: ${toRem(14)};
  @media (max-width: 768px) {
    font-size: ${toRem(18)};
  }
`;

export const PatientContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${toRem(210)};
  justify-content: space-between;
  margin-bottom: ${toRem(30)};
  @media (max-width: 768px) {
    height: ${toRem(300)};
  }
`;

export const PatientData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: ${toRem(10)};
  > *:nth-child(1) {
    flex: 2;
  }
  > *:nth-child(2) {
    flex: 1;
  }
  > *:nth-child(3) {
    flex: 1;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-rows: 1fr 1fr; 
    grid-template-columns: 1fr 1fr; 

    > *:nth-child(1) {
      grid-area: 1 / 1 / 2 / 3; 
    }

    > *:nth-child(2) {
      grid-area: 2 / 1 / 3 / 2; 
    }

    > *:nth-child(3) {
      grid-area: 2 / 2 / 3 / 3; 
    }
}
`;

export const AisleContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding-inline-start: 0;
  
`;

export const AisleInputs = styled.li`
  display: flex;
  gap: ${toRem(10)};
  padding: 0;
`

export const QuestionGroup = styled.div`
  padding: 10px 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  padding: 15px 0;
`
