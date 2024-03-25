import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textgrey } from "../../utils/colors";

export const TextAreaStyled = styled.textarea`
width: ${toRem(316)};
height: ${toRem(152)};
border-radius: 4px;
border: 2px solid ${textgrey};
font-family: Lato;
font-size: ${toRem(14)};
font-style: normal;
font-weight: 400;
line-height: 160%;
padding: 0;
`