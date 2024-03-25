import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textdark, textlight } from "../../utils/colors";

export const PaginationNav = styled.nav`
display:flex;
flex-direction: row;
`
export const PaginationUl = styled.ul`
display:flex;
flex-direction: row;
list-style:none;
gap: ${toRem(8)};
`
export const PaginationNumber = styled.a`
  color: ${textdark} ;  
  text-decoration: none !important;
  padding: ${toRem(4)} ${toRem(8)} ${toRem(4)} ${toRem(8)};
  
  &.selected {   
    background-color: #008EA7;
    color: white;
    border-radius: ${toRem(4)};
  }
`

export const PaginationButton = styled.button`
border: none;
background: transparent;
cursor: pointer;
`
 