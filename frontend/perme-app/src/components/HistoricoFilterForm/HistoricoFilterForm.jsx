// HistoricoFilterForm.jsx
import React, { useState } from 'react';
import Select from "../../micro/Select/Select";
import Text from "../Text/Text";
import { HistoricoFilterFormStyled } from "./HistoricoFilterFormStyled";

const HistoricoFilterForm = ({ onSortChange = () => {} }) => {
  const [selectedSort, setSelectedSort] = useState('');

  const sortOptions = [
    { value: '', label: 'Selecione' },
    { value: 'ordemAlfabetica', label: 'Nome' },
    { value: 'maisNovos', label: 'Data de Aferição (mais recentes)' },
    { value: 'maisAntigos', label: 'Data de Aferição (mais antigas)' },
  ];

  const handleSortChange = (value) => {
    setSelectedSort(value);
    onSortChange(value);
  }

  return (
    <HistoricoFilterFormStyled>
      <Text id="TextoMenor" text="Ordenar por:" />
      <Select options={sortOptions} value={selectedSort} onChange={handleSortChange} />
    </HistoricoFilterFormStyled>
  );
}

export default HistoricoFilterForm;
