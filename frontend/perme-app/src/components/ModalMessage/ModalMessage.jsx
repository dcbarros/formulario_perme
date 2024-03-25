import React from "react";
import Text from "../Text/Text";
import Button from "../Button/Button";
import Card from "../../micro/card/Card";
import { StyledModalMessage, ButtonsContainer, TextContainer, ModalOverlay, StyledLink } from "./ModalMessageStyled";
//import { useHistory } from "react-router-dom";

export const ModalMessage = ({ isOpen, onClose, isError }) => {
  //const history = useHistory();

  const message = isError
    ? "Não foi possível salvar os dados"
    : "Dados salvos com sucesso";

  const buttonText = isError ? "Fechar" : "Ir para gerenciamento";

  const handleButtonClick = () => {
    if (!isError) {
      //history.push('/physiotherapists'); 
    }
  };

  return (
    <>
      <ModalOverlay style={{ display: isOpen ? "absolute" : "none" }}>
        <StyledModalMessage>
          <Card
            id="Modal"
            cardContent={
              <>
                <TextContainer>
                  <Text
                    id="Subtitulo"
                    text={message}
                  ></Text>
                </TextContainer>
                <ButtonsContainer>
                  <StyledLink to="/gerenciamento">
                    <Button
                      id="ButtonExtraLarge"
                      text={buttonText}
                      onClick={handleButtonClick}
                      type="button"
                    ></Button>
                  </StyledLink>
                </ButtonsContainer>
              </>
            }
          ></Card>
        </StyledModalMessage>
      </ModalOverlay>
    </>
  );
};


