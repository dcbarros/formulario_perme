import React, { useState, useEffect } from "react";
import Card from "../../micro/card/Card";
import Text from "../Text/Text";
import {
  CardPacientContainer,
  PacientInfoSContainer,
  DataContainer,
  ButtonsContainer,
  StyledLink,
  IdContainer,
} from "./CardPacienteStyled";
import Button from "../Button/Button";
import api from "../../services/api";
import ModalAdmissao from "../ModalAdmissao/ModalAdmissao";
import { useNavigate } from "react-router-dom";

const CardPaciente = ({
  patient,
  pacientName,
  internalCode,
  entryDate,
  onClickRed,
  onClose,
  PatientInternalCode,
  PatientFullName
}) => {
  const [lastAdmission, setLastAdmission] = useState(null);
  const [isModalAdmissaoOpen, setIsModalAdmissaoOpen] = useState(false);
  const [buttonId, setButtonId] = useState("ButtonExtraLarge");
  const [buttonText, setButtonText] = useState("Nova Aferição");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/patient/combined/${patient.id}`);
        const admissions = response.data[0].admissions || [];
        const lastAdmissionData =
          admissions.length > 0 ? admissions[admissions.length - 1] : null;
        setLastAdmission(lastAdmissionData);

        // Verificar a condição desejada e atualizar o botão
        if (!lastAdmissionData) {
          setButtonId("ButtonExtraLargeGreen");
          setButtonText("Nova Admissão");
        }
      } catch (error) {
        console.error("Erro ao buscar informações da última admissão:", error);
      }
    };

    fetchData();
  }, [patient.id]);

  const handleGreenButtonClick = () => {
    console.log("Handle Green Button Click");
    if (lastAdmission) {
      const { dischargedAt } = lastAdmission;
      console.log("Discharged At:", dischargedAt);
      if (dischargedAt !== null) {
        openModalAdmissao();
      } else {
        console.log("Chamar onClickGreen");
        onClickGreen();
      }
    } else {
      console.log("Não há informações suficientes sobre as admissões do paciente.");
      openModalAdmissao();
    }
  };

  const openModalAdmissao = () => {
    setIsModalAdmissaoOpen(true);
  };

  const closeModalAdmissao = () => {
    setIsModalAdmissaoOpen(false);
  };

  const onClickGreen = () => {
    navigateTo(`/paciente/${patient.id}/afericao`);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <Card
        id="Pacient"
        cardContent={
          <CardPacientContainer>           
            <PacientInfoSContainer>
              <Text id="TextoGrandeBold" text={pacientName} />
              <IdContainer>
                <Text id="TextoMenorBold" text="Nº do prontuário:" />
                <Text id="TextoMenorPink" text={internalCode} />
              </IdContainer>
            </PacientInfoSContainer>
            <DataContainer>
              <Text id="TextoCorridoBoldGreen" text="Data de Entrada:" />
              <Text id="TextoCorridoBoldGreen" text={entryDate} />
            </DataContainer>
            <ButtonsContainer>
              <Button
                id={buttonId}
                text={buttonText}
                onClick={handleGreenButtonClick}
                type="button"
              />
              <Button
                id="RedButtonLarge"
                text="Gerenciar"
                onClick={onClickRed}
                type="button"
              />
            </ButtonsContainer>
            {isModalAdmissaoOpen && (
              <ModalAdmissao patientId={patient.id} onClose={closeModalAdmissao}   PatientInternalCode = {PatientInternalCode}  
              PatientFullName = {PatientFullName} />
            )}
          </CardPacientContainer>
        }
      />
    </>
  );
};

export default CardPaciente;
