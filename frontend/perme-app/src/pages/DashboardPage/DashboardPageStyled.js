import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textlight } from "../../utils/colors";

export const ContainerDashboard = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${textlight};
  padding: ${toRem(16)} ${toRem(128)} ${toRem(16)};

  @media (max-width: ${toRem(768)}) {
    padding: ${toRem(16)} ${toRem(16)} ${toRem(16)};
  }
`;

export const CardsContainers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${toRem(16)};
  gap: 16px;

  @media (min-width: 414px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const GraphicArea = styled.div`
  height: ${toRem(200)};
  width: 75%;

  @media (min-width: 414px) and (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledCard = styled.div`
  height: ${toRem(200)};
  width: 20%;
  border: solid ${toRem(2)} #ddd;
  border-radius: ${toRem(8)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 414px) and (max-width: 768px) {
    width: 100%;
    height: ${toRem(64)};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${toRem(8)};
  }
`;

export const FilterRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${toRem(16)};
`;

export const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

export const DatepickerArea = styled.div`
  width: 5%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-self: flex-end;
  box-sizing: border-box;
  justify-content: flex-end;
`;
