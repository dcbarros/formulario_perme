import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { primary, textlight, hover } from "../../utils/colors";
import { Link } from "react-router-dom";

export const NavbarStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  background-color: ${primary};
  height: ${toRem(56)};
  padding: ${toRem(0)} ${toRem(24)};
  box-sizing: border-box;

  @media (max-width: 768px) {
    justify-content: center;
  }

  &.logo-hospital {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
  }
`;
export const LogoArea = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const ButtonsArea = styled.ul`
  display: flex;
`;

export const Item = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${toRem(0)} ${toRem(16)};

  &:hover {
    border-bottom: solid ${hover} ${toRem(2)};
    margin-bottom: -${toRem(2)};
  }
`;

export const DropdownArea = styled.div`
  display: flex;
`;

export const Dropdown = styled.div`
  display: flex;
  flex-direction: start;
  position: absolute;
  background-color: white;
  margin-top: ${toRem(44)};
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;
