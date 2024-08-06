import {useState} from 'react';
import {extractTableData} from "../utils/extract-table-data.ts";

import {BodyCellStyled, HeaderCellItemsContainerStyled, HeaderCellStyled} from "./table.styled.ts";
import SortIcon from "./SortIcon.tsx";


export interface ITableItem {
  [key: string]: unknown;
}

interface IProps {
  data: ITableItem[];
  columnNamesMap: {
    [key: string]: string;
  }
}

const Table = ({data, columnNamesMap}: IProps) => {
  const headers = extractTableData(data);

  const [sortedData, setSortedData] = useState(data);
  const [sortingColumnIndex, setSortingColumnIndex] = useState(0);
  const [isSortingDirectionAsc, setIsSortingDirectionAsc] = useState(true);

  const handleSortClick = (columnIndex: number) => {
    const newIsSortingDirectionAsc = sortingColumnIndex === columnIndex ? !isSortingDirectionAsc : true;

    setIsSortingDirectionAsc(newIsSortingDirectionAsc);
    setSortingColumnIndex(columnIndex);

    const sortByColumnName = headers[columnIndex];

    const sorted = data.sort((a, b) => {
      const leftValue = a[sortByColumnName] as number | string;
      const rightValue = b[sortByColumnName] as number | string;

      if (leftValue < rightValue) {
        return newIsSortingDirectionAsc ? -1: 1;
      }
      if (rightValue < leftValue) {
        return newIsSortingDirectionAsc ? 1: -1;
      }
      return 0;
    });

    setSortedData(sorted);
  }

  // https://github.com/hibiken/react-places-autocomplete/issues/377
  // Added `any` to overcome this TS error: TS2345: Argument of type KeyboardEvent<HTMLDivElement> is not assignable to parameter of type KeyboardEvent
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortKeyDown = (event: any, index: number) => {
    if (event.key === 'Enter' || event.code === 'Space') {
      handleSortClick(index);
    }
  }

  return (
    <div>
      <table>
        <thead>
        <tr>
          {headers.map((headerItem, index) => {
            return (
              <HeaderCellStyled key={index} scope="col">
                <HeaderCellItemsContainerStyled
                  onClick={() => handleSortClick(index)}
                  onKeyDown={(event) => handleSortKeyDown(event, index)}
                  tabIndex={0}
                >
                  {columnNamesMap[headerItem]}
                  <SortIcon
                    index={index}
                    isAlreadySorted={sortingColumnIndex === index}
                    isSortingDirectionAsc={isSortingDirectionAsc}
                    // tabIndex={0}
                    onClick={() => handleSortClick(index)}
                    // onKeyDown={(event) => handleSortKeyDown(event, index)}
                  />
                </HeaderCellItemsContainerStyled>
              </HeaderCellStyled>
            )
          })}
        </tr>
        </thead>

        <tbody>
        {/*{data.map((singleItem, index) => (*/}
        {sortedData.map((singleItem, index) => (
            <tr key={index}>
              {
                headers.map((headerItem, columnIndex) => {
                  return <BodyCellStyled
                    key={columnIndex}
                    tabIndex={0}
                  >
                    {(singleItem as any)[headerItem]}
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
