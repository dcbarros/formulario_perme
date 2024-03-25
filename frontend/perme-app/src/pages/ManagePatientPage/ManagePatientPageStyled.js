import styled from "styled-components";
import { toRem } from "../../utils/toRem";

export const ManagePatientContainer = styled.div`
display:flex;
flex-direction:column;
margin-top:${toRem(128)};
margin-left: ${toRem(135)};
margin-right: ${toRem(135)};
@media (max-width: 1024px) {
margin-top:${toRem(72)};
margin-left: ${toRem(80)};
margin-right: ${toRem(80)};;   
}
`

export const DataPatientContainer= styled.div`
margin-top:${toRem(40)};
display:flex;
flex-direction:row;
justify-content: flex-start;
gap: ${toRem(80)};
width: 100%;
@media (max-width: 1024px) {
    flex-direction:column;    
    width:100%;   
align-items: center
}
`
export const InputsContainer= styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
gap: ${toRem(40)};
@media (max-width: 1024px) {
    flex-wrap: wrap;    
}
`
export const LocalPatientContainer= styled.div`
margin-top: ${toRem(40)};
`
export const RadioContainer = styled.div`
display:flex;
flex-direction:row;
gap: ${toRem(16)};
` 