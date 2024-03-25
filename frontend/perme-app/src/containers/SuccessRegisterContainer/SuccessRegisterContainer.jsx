import React from "react";
import { SuccessRegisterStyled } from "./SuccessRegisterContainerStyled";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";

const SuccessRegisterContainer = () => {

  return (
    <SuccessRegisterStyled>
      <Text id="Titulo" text="Cadastro realizado com sucesso" />
      <Text
        id="TextoMenor"
        text="Clique no botão abaixo para fazer a primeira aferição do paciente:"
      />
      <Button id="ButtonLarge" text="Nova Aferição" type="onClick" />
    </SuccessRegisterStyled>
  );
};

export default SuccessRegisterContainer;

