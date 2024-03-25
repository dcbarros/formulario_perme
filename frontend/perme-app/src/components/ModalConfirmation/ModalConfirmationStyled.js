import styled from "styled-components";
import { toRem } from "../../utils/toRem";

export const StyledModalConfirmation = styled.div`
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-content: center;
  padding: ${toRem(24)} ${toRem(48)};
  position: fixed;
  z-index: 1000;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const TextContainer = styled.div`
  text-align: center;
  padding-bottom: ${toRem(16)};
`;
