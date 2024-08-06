import sortIcon from "../assets/chevron-sort.svg";
import arrowUpIcon from "../assets/arrow-up.svg";
import arrowDownIcon from "../assets/arrow-down.svg";
import {SortIconStyled} from "./table.styled.ts";

interface IProps {
  index: number;
  isAlreadySorted: boolean;
  isSortingDirectionAsc: boolean;
  // tabIndex: number;
  onClick: (...args: unknown[]) => void;
  // onKeyDown: (event: KeyboardEvent, index: number) => void;
  // onKeyDown: (event: KeyboardEvent) => void;
  // onKeyDown: (event: KeyboardEvent) => void;
}

const SortIcon = ({isAlreadySorted, isSortingDirectionAsc, onClick}: IProps) => {
  // const handleKeyDown = (event: KeyboardEvent) => {
  //   onKeyDown(event);
  // }
  return (
    <SortIconStyled
      src={isAlreadySorted ? isSortingDirectionAsc ? arrowUpIcon : arrowDownIcon : sortIcon}
      // tabIndex={tabIndex}
      onClick={onClick}
      // onKeyDown={(event) => handleKeyDown(event)}
    />
  );
}

export default SortIcon;
