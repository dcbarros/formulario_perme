import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { Link } from "react-router-dom";

export const PatientsContainer = styled.div`
margin-top: ${toRem(72)};
margin-left: ${toRem(132)};
margin-right: ${toRem(132)};
max-width:${toRem(1440)};
@media (max-width: 592px) {
    margin-left: ${toRem(8)};
    margin-right: ${toRem(8)};
}
`;

export const TopContainer = styled.div`
display: flex;
flex-direction:column;
`

export const SearchBox = styled.div`
display:flex;
flex-direction:row;
gap: ${toRem(16)};
@media (max-width: 1042px) {
    flex-direction:column;    
    width:100%;   
align-items: center
}
@media (max-width: 592px) {
    margin-bottom: ${toRem(16)};
}
`
export const SearchContainer = styled.div`
display: flex;
flex-direction:row;
justify-content: space-between;
margin-top: ${toRem(32)};
@media (max-width: 592px) {
    flex-direction:column;    
    width:100%;   
align-items: center
}
`
export const CardsContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 100%;
margin-top: 3rem;
justify-content: space-between;

`
export const PaginationContainer = styled.div`
display: flex;
flex-direction: row-reverse;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
`;