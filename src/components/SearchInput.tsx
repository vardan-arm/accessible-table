import {useState} from "react";

interface IProps {
  onChange: (value: string) => void;
}

const SearchInput = ({onChange}: IProps) => {
  const [value, setValue] = useState('');

  // Pass TS error for now
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const newValue = event.target.value;
    console.log('newValue: ', newValue);
    setValue(newValue);

    onChange(newValue);
  };

  return (
    <div>
      <input value={value} onChange={handleChange} />
    </div>
  )
}

export default SearchInput;
