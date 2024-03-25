import styled from "styled-components";
import { toRem } from "../../utils/toRem";

export const SelectStyled = styled.select`
width: ${toRem(181)};
height: ${toRem(36)};
color: #808080;
border-radius: ${toRem(4)};
border: 2px solid #808080;
`
export const OptionStyled = styled.option`
font-family: Lato;
font-size: ${toRem(14)};
font-style: normal;
font-weight: 400;
line-height: 160%;
color: #808080;
`