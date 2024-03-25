import React from "react";

import Text from "../Text/Text";
import Button from "../Button/Button";
import {
  StyledModalConfirmation,
  ButtonsContainer,
  TextContainer,
} from "./ModalConfirmationStyled";
import Card from "../../micro/card/Card";
export const ModalConfirmation = ({ isOpen, onClose, onConfirm }) => {
  return (
    <StyledModalConfirmation style={{ display: isOpen ? "flex" : "none" }}>
      <Card
        id="Modal"
        cardContent={
          <>
            <TextContainer>
              <Text
                id="Titulo"
                text="Tem certeza de que deseja excluir este fisioterapeuta?"
              ></Text>
            </TextContainer>
            <ButtonsContainer>
              <Button
                id="NoFillButtonLarge"
                text="Cancelar"
                onClick={onClose}
              ></Button>{" "}
              <Button
                id="ButtonLargePink"
                text="Confirmar"
                onClick={onConfirm}
              ></Button>
            </ButtonsContainer>
          </>
        }
      ></Card>
    </StyledModalConfirmation>
  );
};
