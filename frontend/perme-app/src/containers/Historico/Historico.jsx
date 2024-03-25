import React, { useState, useEffect } from 'react';
import { HistoricoContainer, HeaderContainer } from './HistoricoStyled';
import Text from '../../components/Text/Text';
import TablePatient from '../../components/TablePatient/TablePatient';
import Button from '../../components/Button/Button';
import HistoricoFilterForm from '../../components/HistoricoFilterForm/HistoricoFilterForm';
import api from '../../services/api'

const Historico = ({ database, patientId }) => {
  const [filterType, setFilterType] = useState('FilterBy');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [tableData, setTableData] = useState(null);

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

  const getTableData = () => {
    return tableData; 
  };

  const exportData = (data) => {
    if (!data) {
      console.error('Erro ao obter dados da tabela para exportação.');
      return;
    }

    const convertToCSV = (data) => {
      if (!data || !data.measurements || data.measurements.length === 0) {
        console.error('Dados inválidos para conversão CSV.');
        return '';
      }
    
      const header = Object.keys(data.measurements[0]).join(',');
      const rows = data.measurements.map((measurement) => Object.values(measurement).join(','));
    
      return `${header}\n${rows.join('\n')}`;
    }; 

    const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const blobUrl = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = 'historico_paciente.csv';
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(blobUrl);
  document.body.removeChild(a);
};

  useEffect(() => {    
    const fetchData = async () => {
      try {
        const response = await api.get(`/patient/patientBoard/${patientId}`);
        const data = response.data;
        setTableData(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchData();
  }, [patientId]);

  return (
    <HistoricoContainer>
      <HeaderContainer>
        <Text id="TextoGrandeBold" text="Histórico do Paciente" />
        <HistoricoFilterForm onSortChange={handleSortChange} />
      </HeaderContainer>
      <TablePatient
        patientId={patientId}
        filterType={filterType}
        selectedFilter={selectedFilter}
        selectedSort={selectedSort}
        patientData={tableData} 
      />
      <Button id="ButtonLargePink" text="Exportar" onClick={() => exportData(tableData)} type="button" />
    </HistoricoContainer>
  );
};

export default Historico;
