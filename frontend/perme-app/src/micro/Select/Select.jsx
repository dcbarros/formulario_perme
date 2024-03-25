import {SelectStyled, OptionStyled} from './SelectStyled'

function Select({ options, onChange, value }) {

  const handleSelectChange = (event) => {

    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <SelectStyled value={value} onChange={handleSelectChange}>
      {options.map((option, index) => (
        <OptionStyled key={index} value={option.value}>
          {option.label}
        </OptionStyled>
      ))}
    </SelectStyled>
  );
}

export default Select;

/* Como usar a prop options 
colocar no arquivo que chamar o select: 

 const options = [
    { value: 'option1', label: 'Opção 1' },
    { value: 'option2', label: 'Opção 2' },
    { value: 'option3', label: 'Opção 3' },
  ];

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };*/
