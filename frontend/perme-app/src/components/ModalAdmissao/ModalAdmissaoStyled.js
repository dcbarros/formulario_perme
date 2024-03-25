import styled from "styled-components";
import { toRem } from "../../utils/toRem";
import { textlight } from "../../utils/colors";

export const ModalContainer = styled.div`
position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);    
`

export const FormAdmissao = styled.form`
display:flex;
flex-direction: column;
align-items: center;
max-width: 100%;
gap: ${toRem(16)};
`
export const FormContainer = styled.div`
display:flex;
flex-direction: column;
align-items: flex-start;
`

export const ButtonContainer = styled.div`
display:flex;
flex-direction:column;
margin-top: ${toRem(16)};
align-items:center;
gap:${toRem(8)};
`

