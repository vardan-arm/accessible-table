import {useState} from 'react';
import {extractTableData} from "../utils/extract-table-data.ts";

import {
  BodyCellStyled,
  HeaderCellContainerStyled,
  HeaderCellSortableContainerStyled,
  HeaderCellStyled
} from "./table.styled.ts";
import SortIcon from "./SortIcon.tsx";
import SearchInput from "./SearchInput.tsx";


export interface ITableItem {
  [key: string]: string | number;
}

interface IProps {
  data: ITableItem[];
  columnNamesMap: {
    [key: string]: string;
  };
  searchableColumns?: string[];
}

// NOTE: This component should be renamed to be Capitalized... I didn't do that to not spend extra time playing with git...
//  (it has issues on renaming file name case)
const Table = ({data, columnNamesMap, searchableColumns = []}: IProps) => {
  const headers = extractTableData(data);

  const [sortedAndFilteredData, setSortedAndFilteredData] = useState(data);
  const [sortingColumnIndex, setSortingColumnIndex] = useState(0);
  const [isSortingDirectionAsc, setIsSortingDirectionAsc] = useState(true);

  const handleSortClick = (columnIndex: number) => {
    const newIsSortingDirectionAsc = sortingColumnIndex === columnIndex ? !isSortingDirectionAsc : true;

    setIsSortingDirectionAsc(newIsSortingDirectionAsc);
    setSortingColumnIndex(columnIndex);

    const sortByColumnName = headers[columnIndex];

    // TODO: move to a util file?
    const sorted = [...data].sort((a, b) => {
      const leftValue = a[sortByColumnName] as number | string;
      const rightValue = b[sortByColumnName] as number | string;

      if (leftValue < rightValue) {
        return newIsSortingDirectionAsc ? -1 : 1;
      }
      if (rightValue < leftValue) {
        return newIsSortingDirectionAsc ? 1 : -1;
      }
      return 0;
    });

    setSortedAndFilteredData(sorted);
  }

  // https://github.com/hibiken/react-places-autocomplete/issues/377
  // Added `any` to overcome this TS error: TS2345: Argument of type KeyboardEvent<HTMLDivElement> is not assignable to parameter of type KeyboardEvent
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortKeyDown = (event: any, index: number) => {
    if (event.key === 'Enter' || event.code === 'Space') {
      handleSortClick(index);
    }
  }

  const handleFilter = (value: string, index: number) => {
    // NOTE: I could use transition here, but not now :)
    const filterByColumnName = headers[index];
    const filteredValues = data.filter(item => {
      const currentValue = `${item[filterByColumnName]}`;
      return currentValue.includes(value);
    });
    setSortedAndFilteredData(filteredValues);
  }

  return (
    <div>
      <table>
        <thead>
        <tr>
          {headers.map((headerItem, index) => {
            const isColumnSearchable = searchableColumns.includes(headerItem);

            return (
              <HeaderCellStyled key={index} scope="col">
                <HeaderCellContainerStyled>
                  <HeaderCellSortableContainerStyled
                    onClick={() => handleSortClick(index)}
                    onKeyDown={(event) => handleSortKeyDown(event, index)}
                    tabIndex={0}
                  >
                    {columnNamesMap[headerItem]}
                    <SortIcon
                      index={index}
                      isAlreadySorted={sortingColumnIndex === index}
                      isSortingDirectionAsc={isSortingDirectionAsc}
                      onClick={() => handleSortClick(index)}
                    />
                  </HeaderCellSortableContainerStyled>
                  {isColumnSearchable && (
                    <SearchInput onChange={(value) => handleFilter(value, index)} />
                  )}
                </HeaderCellContainerStyled>
              </HeaderCellStyled>
            )
          })}
        </tr>
        </thead>

        <tbody>
        {sortedAndFilteredData.map((singleItem, index) => (
            <tr key={index}>
              {
                headers.map((headerItem, columnIndex) => {
                  return <BodyCellStyled
                    key={columnIndex}
                    tabIndex={0}
                  >
                    {singleItem[headerItem]}
                  </BodyCellStyled>
                })
              }
            </tr>
          )
        )}
        </tbody>
      </table>
    </div>
  )
}

export default Table;
