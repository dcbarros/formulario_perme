import styled from "styled-components";
import { toRem } from "../../utils/toRem";

export const HistoricoContainer = styled.div`
display: flex;
flex-direction: column;
width: ${toRem(798)};
@media (max-width: 768px) {    
    width:100%;    
}
@media (max-width: 478px) {    
    width:100%; 
    align-items:center;   
}
`

export const HeaderContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
@media (max-width: 768px) {
    flex-direction:column;    
    width:100%;
}
`