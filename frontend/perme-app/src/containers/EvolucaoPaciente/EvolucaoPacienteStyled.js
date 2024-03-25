import styled from "styled-components";
import { toRem } from "../../utils/toRem";

export const EvolucaoPacienteContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: ${toRem(368)};
@media (max-width: 768px) {    
    align-items:center;    
}
`

export const ButtonsContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
gap: ${toRem(16)};
margin-top: ${toRem(80)};
`

export const GraphicContainer = styled.div`
height: 100%;
margin-top: ${toRem(40)};
`

