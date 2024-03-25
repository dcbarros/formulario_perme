import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textlight } from "../../utils/colors";
import { Link } from "react-router-dom";

export const TableContainer = styled.div`
  width: 100%;
`;

export const ContainerManagement = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  background-color: ${textlight};
  padding: ${toRem(64)} ${toRem(128)};

  @media (max-width: ${toRem(768)}) {
    padding: ${toRem(16)} ${toRem(16)} ${toRem(16)};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${toRem(24)};
  margin-bottom: ${toRem(48)};
  width: 100%;

  @media (min-width: 414px) and (max-width: 768px) {
    display: flex;
    gap: 8px;
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
`;
