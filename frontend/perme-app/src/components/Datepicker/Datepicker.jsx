import React from "react";
import Select from "../../micro/Select/Select";

const Datepicker = ({ onChange, value, disabled }) => {
  const handleYearChange = (selectedYear) => {
    onChange(selectedYear);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) =>
    (currentYear + index).toString()
  );

  const options = years.map((year) => ({
    value: year,
    label: year,
  }));

  return (
    <Select
      options={options}
      value={value}
      onChange={handleYearChange}
      disabled={disabled}
    />
  );
};

export default Datepicker;
