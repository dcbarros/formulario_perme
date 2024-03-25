import React from "react";
import Input from "../../micro/Input/Input";
import Text from "../Text/Text";
import { FormContentStyled} from "./FormContentStyled.js";

const FormContent = ({ label, className,id, type, value, placeholder, error, register, onChange, disabled, checked }) => {
   switch (className) {

    case 'withRadio': 
  return (   
    <>
      <FormContentStyled className="comInputRadio">      
      <Input id={id} type="radio" register={register} value={value} disabled={disabled} checked={checked}></Input>
      <Text id="TextoMenorBold" text={label}></Text>         
    </FormContentStyled>      
      </>
  );
  default: 
  return (
    <FormContentStyled>
    <Text id="TextoMenorBold" text={label}></Text>
    <Input id={id} type={type} placeholder={placeholder} register={register} value={value} onChange={onChange} disabled={disabled}></Input>
    <Text id="TextoErro" text={error}></Text>
  </FormContentStyled>
  )
};
}
export default FormContent;
