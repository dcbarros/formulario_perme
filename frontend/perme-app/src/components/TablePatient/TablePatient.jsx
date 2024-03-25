import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { TablePatientContainer, StyledTable, StyledThead, StyledTr, StyledTbody, StyledTd } from './TablePatientStyled';
import { format } from 'date-fns';

const TablePatient = ({ patientId, filterType, selectedFilter, selectedSort, tableDataProp }) => {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/patient/patientBoard/${patientId}`);
        const data = response.data;
        setPatientData(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchData();
  }, [patientId]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  const patientInfo = {
    patientName: patientData.patientName,
    patientIdentifier: patientData.patientIdentifier,
    patientEntry: patientData.patientEntry,
  };

  const measurements = patientData.measurements;

  if (measurements.length === 0) {
    return <StyledTd>Nenhuma aferição foi registrada até o momento.</StyledTd>;
  }

  let filteredMeasurements = patientData.measurements;
  if (filterType === 'FilterBy' && selectedFilter) {
    filteredMeasurements = filteredMeasurements.filter((measurement) => {
      return measurement.physiotherapistName === selectedFilter;
    });
  }

  if (selectedSort === 'ordemAlfabetica') {
    filteredMeasurements.sort((a, b) => a.physiotherapistName.localeCompare(b.physiotherapistName));
  } else if (selectedSort === 'maisNovos') {
    filteredMeasurements.sort((a, b) => new Date(b.dataMeasurement) - new Date(a.dataMeasurement));
  } else if (selectedSort === 'maisAntigos') {
    filteredMeasurements.sort((a, b) => new Date(a.dataMeasurement) - new Date(b.dataMeasurement));
  }

  return (
    <TablePatientContainer>
      <StyledTable>
        <StyledThead>
          <StyledTr>
            <th>Nome do Fisioterapeuta</th>
            <th>Identificador</th>
            <th>Data de Aferição</th>
            <th>Score Perme</th>
          </StyledTr>
        </StyledThead>
        <StyledTbody>
          {filteredMeasurements.map((measurement, index) => (
            <StyledTr key={index}>
              <StyledTd>{measurement.physiotherapistName}</StyledTd>
              <StyledTd>{measurement.physiotherapistId}</StyledTd>
              <StyledTd>{format(new Date(measurement.dataMeasurement), 'dd/MM/yyyy')}</StyledTd>
              <StyledTd>{measurement.score}</StyledTd>
            </StyledTr>
          ))}
        </StyledTbody>
      </StyledTable>
    </TablePatientContainer>
  );
};

export default TablePatient;
