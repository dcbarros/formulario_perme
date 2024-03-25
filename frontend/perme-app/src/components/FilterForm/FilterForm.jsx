// FilterForm.jsx

import React, { useState, useEffect } from 'react';
import Select from "../../micro/Select/Select";
import Text from "../Text/Text";
import { FilterFormStyled } from "./FilterFormStyled";

const FilterForm = ({ onFilterChange = () => {}, onSortChange = () => {}, filterType }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const filterOptions = [
    { value: '', label: 'Selecione' },
    { value: 'VerTodos', label: 'Ver Todos' },
    { value: 'CTI', label: 'CTI' },
    { value: 'Enfermaria', label: 'Enfermaria' },
  ];

  const sortOptions = [
    { value: '', label: 'Selecione' },
    { value: 'maisAntigos', label: 'Mais antigos' },
    { value: 'maisNovos', label: 'Mais novos' },
    { value: 'ordemAlfabetica', label: 'Ordem alfabética' },
    { value: 'prontuario', label: 'Prontuário'}
  ];

  useEffect(() => {
    if (filterType === 'FilterBy') {
      setSelectedFilter(filterOptions[0].value);
    } else {
      setSelectedSort(sortOptions[0].value);
    }
  }, [filterType, filterOptions, sortOptions]);

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    onFilterChange(value);
  }

  const handleSortChange = (value) => {
    setSelectedSort(value);
    onSortChange(value);
  }

  return (
    <FilterFormStyled>
      {filterType === 'FilterBy' ? (
        <>
          <Text id="TextoMenor" text="Filtrar por:" />
          <Select options={filterOptions} value={selectedFilter} onChange={handleFilterChange} />
        </>
      ) : (
        <>
          <Text id="TextoMenor" text="Ordenar por:" />
          <Select options={sortOptions} value={selectedSort} onChange={handleSortChange} />
        </>
      )}
    </FilterFormStyled>
  );
}

export default FilterForm;
