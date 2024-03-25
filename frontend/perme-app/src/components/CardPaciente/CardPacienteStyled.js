import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { Link } from "react-router-dom";

export const CardPacientContainer = styled.div`
padding: ${toRem(17)} ${toRem(24)} ${toRem(24)} ${toRem(24)};
`

export const PacientInfoSContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
justify-content: space-between;
align-items: center;
padding-bottom: ${toRem(16)};
`

export const DataContainer = styled.div`
 display:flex;
 flex-direction: row;
 margin-bottom: ${toRem(24)};
 justify-content: center;
 gap: ${toRem(8)};
`;

export const ButtonsContainer = styled.div`
display: flex;
justify-content: space-between;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const IdContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color: #fff;
border-radius: ${toRem(8)};
padding:${toRem(4)};
width: ${toRem(128)};
height: ${toRem(40)};
margin-top: ${toRem(16)};
`