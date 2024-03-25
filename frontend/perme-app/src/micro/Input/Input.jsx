import React from "react";
import {
  InputStyled,
  LabelStyled,
  RadioContainer,
  RadioInput,
  CustomRadio,
} from "./InputStyled";
import Text from "../../components/Text/Text";

const Input = ({ id, type, placeholder, value, label, onChange, handleRadioChange, checked,register, disabled, name }) => {
  return (
    <>
      {type === "radio" ? (
        <LabelStyled>
          <RadioContainer>
            <RadioInput id={id} type={type} value={value}{...register} checked={checked} onChange={handleRadioChange} name={name} disabled={disabled}/>
            <CustomRadio />
          </RadioContainer>
          <Text id="TextoMenor" className="TextoMenor" text={label}/>
        </LabelStyled>
      ) : (
        <InputStyled
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          onChange={onChange}
          value={value}
          disabled={disabled}
        ></InputStyled>
      )}
    </>
  );
};

export default Input;
