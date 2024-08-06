import sortIcon from "../assets/chevron-sort.svg";
import arrowUpIcon from "../assets/arrow-up.svg";
import arrowDownIcon from "../assets/arrow-down.svg";
import {SortIconStyled} from "./table.styled.ts";

interface IProps {
  index: number;
  isAlreadySorted: boolean;
  isSortingDirectionAsc: boolean;
  onClick: (...args: unknown[]) => void;
}

const SortIcon = ({isAlreadySorted, isSortingDirectionAsc, onClick}: IProps) => {
  return (
    <SortIconStyled
      src={isAlreadySorted ? isSortingDirectionAsc ? arrowUpIcon : arrowDownIcon : sortIcon}
      onClick={onClick}
    />
  );
}

export default SortIcon;
