import React, { useState, useEffect } from "react";
import Text from "../../components/Text/Text";
import {
  PatientsContainer,
  TopContainer,
  SearchBox,
  SearchContainer,
  CardsContainer,
  PaginationContainer,
  StyledLink,
} from "./PatientsPageStyled";
import FilterForm from "../../components/FilterForm/FilterForm";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";
import CardPaciente from "../../components/CardPaciente/CardPaciente";
import Pagination from "../../components/Paginacao/Pagination";
import api from "../../services/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [sortType, setSortType] = useState("");
  const [filteredAndSortedPatients, setFilteredAndSortedPatients] = useState([]);
  const patientsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const patientResponse = await api.get(`/patient`);
        const patientsData = patientResponse.data;

        const updatedPatients = await Promise.all(
          patientsData.map(async (patient) => {
            const additionalDetailsResponse = await api.get(`/patient/combined/${patient.id}`);
            const additionalDetails = additionalDetailsResponse.data;
            return { ...patient, ...additionalDetails };
          })
        );

        setPatients(updatedPatients);
        setFilteredAndSortedPatients(sortPatients(updatedPatients, sortType));
      } catch (error) {
        console.error("Erro ao buscar a lista de pacientes:", error);
      }
    };

    fetchData();
  }, [sortType]);

  const handleFilterChange = (value) => {
    setFilterType(value);
    const filteredPatients = patients.filter((patient) =>
      patient.fullName.toLowerCase().includes(value.toLowerCase()) ||
      patient.internalCode.toString().includes(value)
    );
    setFilteredAndSortedPatients(sortPatients(filteredPatients, sortType));
  };

  const handleSortChange = (value) => {
    setSortType(value);
    setFilteredAndSortedPatients(sortPatients(patients, value));
  };

  const sortPatients = (patients, sortType) => {
    switch (sortType) {
      case "ordemAlfabetica":
        return patients.slice().sort((a, b) => a.fullName.localeCompare(b.fullName));

      case "prontuario":
        return patients.slice().sort((a, b) => a.internalCode - b.internalCode);

      case "maisAntigos":
        return patients.slice().sort((a, b) => new Date(a.entryDate) - new Date(b.entryDate));

      case "maisNovos":
        return patients.slice().sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));

      default:
        return patients;
    }
  };

  const formatDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const navigateToManagePatient = (patient) => {
    navigate(`/gerenciarpaciente/${patient.id}`, { state: { patient } });
  };

  return (
    <PatientsContainer>
      <TopContainer>
        <Text id="Titulo" text="Pacientes"></Text>
        <SearchContainer>
          <SearchBox>
            <FilterForm
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              filterType={filterType}
            />
            <Search type="physiotherapist" onFilterChange={handleFilterChange} />
          </SearchBox>
          <StyledLink to="/cadastropaciente">
            <Button
              id="ButtonLarge"
              type="Button"
              text="Novo Paciente"
              onClick={() => navigateTo("/cadastropaciente")}
            />
          </StyledLink>
        </SearchContainer>
      </TopContainer>
      <CardsContainer>
        {filteredAndSortedPatients
          .slice((currentPage - 1) * patientsPerPage, currentPage * patientsPerPage)
          .map((patient, index) => {
            const hasAdmissions = patient.admissions && patient.admissions.length > 0;
            const hasMeasurements =
              hasAdmissions &&
              patient.admissions[0].measurements &&
              patient.admissions[0].measurements.length > 0;

            return (
              <CardPaciente
                key={index}
                patient={patient}
                pacientName={patient.fullName}
                internalCode={patient.internalCode}
                entryDate={formatDate(patient.entryDate)}                          
                onClickRed={() => navigateToManagePatient(patient)}
                PatientInternalCode = {patient.internalCode}  
                PatientFullName = {patient.fullName} 
              />
            );
          })}
      </CardsContainer>
      <PaginationContainer>
        <Pagination
          totalPatients={filteredAndSortedPatients.length}
          patientsPerPage={patientsPerPage}
          currentPage={currentPage}
          paginate={(pageNumber) => {
            setCurrentPage(pageNumber);
            console.log(`Página ${pageNumber} selecionada.`);
          }}
        />
      </PaginationContainer>
    </PatientsContainer>
  );
};

export default PatientsPage;
