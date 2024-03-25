import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { Link } from "react-router-dom";

export const StyledModalMessage = styled.div`
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  border-radius: 16px;
  box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.2);
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

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
`;