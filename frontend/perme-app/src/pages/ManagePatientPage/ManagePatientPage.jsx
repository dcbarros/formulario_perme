import React, { useState, useEffect } from "react";
import {
  ManagePatientContainer,
  DataPatientContainer,
  InputsContainer,
  LocalPatientContainer,
  RadioContainer,
} from "./ManagePatientPageStyled";
import FormContent from "../../components/FormContent/FormContent";
import Historico from "../../containers/Historico/Historico";
import EvolucaoPaciente from "../../containers/EvolucaoPaciente/EvolucaoPaciente";
import Text from "../../components/Text/Text";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import api from "../../services/api";

const ManagePatientPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const patientData = location.state && location.state.patient;
  const [dischargedAt, setDischargedAt] = useState(null);
  const [database, setDatabase] = useState({
    patientName: "",
    patientIdentifier: "",
    patientEntry: "",
    measurements: [],
    hospitalSector: "", 
  });
  const hasMeasurements =
    patientData &&
    patientData.measurements &&
    patientData.measurements.length > 0;

    const formatDate = (date) => {
      if (!date) {
        return 'N/A';
      }
    
      try {
        return format(new Date(date), 'dd/MM/yyyy');
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'N/A';
      }
    };
    
    useEffect(() => {
      const fetchHistoricalData = async () => {
        try {
          const response = await api.get(`/patient/patientBoard/${id}`);   
         
    
          if (response && response.data) {
            const patientBoardData = response.data;
            setDatabase(patientBoardData);            
          } else {
            console.error('Resposta da API inválida:', response);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do paciente:', error);
        }
      };
    
      if (id) {
        fetchHistoricalData();
      }
    }, [id]);

    useEffect(() => {
      const fetchPatientlData = async () => {
        try {
          const response = await api.get(`/patient/combined/${id}`);           
    
          if (response && response.data) {
            const patientIdData = response.data;
           console.log(patientIdData)          
          } else {
            console.error('Resposta da API inválida:', response);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do paciente:', error);
        }
      };
    
      if (id) {
        fetchPatientlData();
      }
    }, [id]);
  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get(`/patient/combined/${id}`);
          const data = response.data;
  
          console.log("API Response:", data);
  
          const admissionsData = data[0].admissions || [];
  
          console.log("Admissions Data:", admissionsData);
  
          const hasAdmissions = admissionsData.length > 0;
  
          if (hasAdmissions) {
            const latestAdmission = admissionsData[admissionsData.length - 1];
            setDischargedAt(latestAdmission.dischargedAt); 
            console.log("Discharged At:", dischargedAt);
          } else {
            console.log("Não há admissões");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [id]);
    
    let lastMeasurementDate = "N/A";
    if (database && database.measurements && database.measurements.length > 0) {      
      const lastMeasurement = database.measurements[database.measurements.length - 1];
      lastMeasurementDate = formatDate(lastMeasurement.dataMeasurement);
    }
  
    let lastHospitalSector = "N/A";
    if (database && database.measurements && database.measurements.length > 0) {      
      const lastSector = database.measurements[database.measurements.length - 1];
      lastHospitalSector = lastSector.hospitalSector;
    } 
    const PatientFullName = database.patientName;    
    const PatientInternalCode = database.patientIdentifier;
    
  return (
    <ManagePatientContainer>
      <InputsContainer>
        <FormContent type="text" value={database.patientName} label="Nome" />
        <FormContent
          type="text"
          value={database.patientIdentifier}
          label="Nº do Prontuário"
        />
        <FormContent
          type="text"
          value={formatDate(database.patientEntry)}
          label="Data de Entrada"
        />
      <FormContent
      type="text"
      value={lastMeasurementDate}
      label="Data da última aferição"  
    />
      </InputsContainer>
      <LocalPatientContainer>
        <Text id="TextoGrandeBold" text="O paciente encontra-se na:" />

        {dischargedAt !== null ? (
      <div>
        <Text
          id="TextoMenorBold"
          text={"O paciente recebeu alta no dia " + formatDate(dischargedAt)}
        />
      </div>
    ) : (
      <RadioContainer>
        <FormContent
          className="withRadio"
          value="CTI"
          label="CTI"
          checked={lastHospitalSector === "CTI"}
          disabled
        />
        <FormContent
          className="withRadio"
          value="Enfermaria"
          label="Enfermaria"
          checked={lastHospitalSector === "Enfermaria"}
          disabled
        />
      </RadioContainer>
       )}
      </LocalPatientContainer>
      <DataPatientContainer>
        <Historico database={database} patientId={id}/>   
        <EvolucaoPaciente pacienteId={id} measurements={database.measurements} PatientFullName={PatientFullName} PatientInternalCode={PatientInternalCode}/>
      </DataPatientContainer>      
    </ManagePatientContainer>
  );
};

export default ManagePatientPage;

