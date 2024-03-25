import React, { useState } from "react";
import Text from "../Text/Text";
import Input from "../../micro/Input/Input";
import { StyledSearch } from "./SearchStyled";

const Search = ({ onFilterChange }) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);
    onFilterChange(text);
  };

  return (
    <StyledSearch>
      <Text id="TextoMenor" text="Buscar:" />
      <Input
        id="search"
        type="text"
        placeholder="Nome ou número de prontuário"
        value={filterText}
        onChange={handleFilterChange}
      />
    </StyledSearch>
  );
};

export default Search;
