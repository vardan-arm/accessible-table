import {useState} from "react";
import {SearchInputContainerStyled, SearchInputStyled} from "./SearchInput.styled.tsx";

interface IProps {
  onChange: (value: string) => void;
}

const SearchInput = ({onChange}: IProps) => {
  const [value, setValue] = useState('');

  // Pass TS error for now
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const newValue = event.target.value;
    setValue(newValue);

    onChange(newValue);
  };

  return (
    <SearchInputContainerStyled>
      <SearchInputStyled value={value} onChange={handleChange} />
    </SearchInputContainerStyled>
  )
}

export default SearchInput;
