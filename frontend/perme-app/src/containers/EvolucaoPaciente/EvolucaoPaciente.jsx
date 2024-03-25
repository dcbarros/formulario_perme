import React, { useEffect, useState } from "react";
import Text from "../../components/Text/Text";
import {
  EvolucaoPacienteContainer,
  ButtonsContainer,
  GraphicContainer,
} from "./EvolucaoPacienteStyled";
import GraphicPatient from "../../components/Graphic/GraphicPatient";
import Button from "../../components/Button/Button";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import ModalAlta from "../../components/ModalAlta/ModalAlta";
import ModalAdmissao from "../../components/ModalAdmissao/ModalAdmissao"

const EvolucaoPaciente = ({ pacienteId, measurements, PatientInternalCode,  PatientFullName }) => {
  const navigate = useNavigate();  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [admissions, setAdmissions] = useState([]);
  const [altaButtonText, setAltaButtonText] = useState("Carregando...");
  const [isSecondButtonDisabled, setIsSecondButtonDisabled] = useState(false);
  const [isModalAdmissaoOpen, setIsModalAdmissaoOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/patient/combined/${pacienteId}`);
        const data = response.data;        

        const admissionsData = data[0].admissions || [];       

        const hasAdmissions = admissionsData.length > 0;

        if (hasAdmissions) {
          const latestAdmission = admissionsData[admissionsData.length - 1];
          const dischargedAt = latestAdmission.dischargedAt;        

          if (dischargedAt !== null) {
            setAltaButtonText("Nova Admissão");
            setIsSecondButtonDisabled(false);
          } else {
            setAltaButtonText("Dar Alta");
            setIsSecondButtonDisabled(true);
          }

          setAdmissions(admissionsData);
        } else {
          console.log("Não há admissões");
          setAltaButtonText("Nova Admissão");
          setIsSecondButtonDisabled(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pacienteId]);

  const handleAltaButtonClick = () => {
    console.log("Admissions:", admissions);
  
    if (admissions.length > 0) {
      const latestAdmission = admissions[admissions.length - 1];
      const dischargedAt = latestAdmission.dischargedAt;
  
      console.log("Discharged At:", dischargedAt);
  
      if (dischargedAt !== null) {
        openModalAdmissao();
      } else {
        openModal();
      }
    } else {
      openModalAdmissao();
    }
  };
  
  const navigateTo = (path) => {
    navigate(path);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalAdmissao = () => {
    setIsModalAdmissaoOpen(true);
  };

  const closeModalAdmissao = () => {
    setIsModalAdmissaoOpen(false);
  };

  return (
    <EvolucaoPacienteContainer>
      <GraphicContainer>
      <GraphicPatient measurements={measurements}/>
      </GraphicContainer>
      <ButtonsContainer>
        <Button
          id="ButtonLargeGreen"
          text={altaButtonText}
          type="button"
          onClick={handleAltaButtonClick}
        />
        <Button
          id={isSecondButtonDisabled ? "ButtonLarge" : "DisabledButtonLarge"}
          text="Nova Aferição"
          type="button"
          onClick={() => navigateTo(`/paciente/${pacienteId}/afericao`)}
          disabled={!isSecondButtonDisabled}
        />
      </ButtonsContainer>

      {isModalOpen && (
        <ModalAlta pacienteId={pacienteId} onClose={closeModal} />
      )}
      {isModalAdmissaoOpen && (
        <ModalAdmissao patientId={pacienteId} onClose={closeModalAdmissao} PatientInternalCode={PatientInternalCode}  PatientFullName={PatientFullName}/>
      )}
    </EvolucaoPacienteContainer>
  );
};

export default EvolucaoPaciente;
