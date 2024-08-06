import {useEffect, useState} from 'react';
import {extractTableData} from "../utils/extract-table-data.ts";

import {
  BodyCellStyled,
  HeaderCellContainerStyled,
  HeaderCellSortableContainerStyled,
  HeaderCellStyled,
  TableRowStyled,
  TableStyled
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

  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const newFilteredData = data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // Skip empty filters
        return item[key].toString().toLowerCase().includes(value.toLowerCase());
      });
    });
    setSortedAndFilteredData(newFilteredData);
  }, [data, filters]);

  const handleSortClick = (columnIndex: number) => {
    const newIsSortingDirectionAsc = sortingColumnIndex === columnIndex ? !isSortingDirectionAsc : true;

    setIsSortingDirectionAsc(newIsSortingDirectionAsc);
    setSortingColumnIndex(columnIndex);

    const sortByColumnName = headers[columnIndex];

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
    const filterByColumnName = headers[index];

    setFilters(prevFilters => ({
      ...prevFilters,
      [filterByColumnName]: value
    }));
  }

  return (
    <div>
      <TableStyled>
        <thead>
        <tr>
          {headers.map((headerItem, index) => {
            const isColumnSorted = sortingColumnIndex === index;
            const isColumnSearchable = searchableColumns.includes(headerItem);

            return (
              <HeaderCellStyled key={index} scope="col" isSorted={isColumnSorted}>
                <HeaderCellContainerStyled>
                  <HeaderCellSortableContainerStyled
                    onClick={() => handleSortClick(index)}
                    onKeyDown={(event) => handleSortKeyDown(event, index)}
                    tabIndex={0}
                  >
                    {columnNamesMap[headerItem]}
                    <SortIcon
                      index={index}
                      isAlreadySorted={isColumnSorted}
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
            <TableRowStyled key={index}>
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
            </TableRowStyled>
          )
        )}
        </tbody>
      </TableStyled>
    </div>
  )
}

export default Table;
