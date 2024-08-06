import styled from "styled-components";
import {extractTableData} from "../utils/extract-table-data.ts";

const TableStyled = styled.table`
    font-family: 'Lato', sans-serif;
`;

const HeaderCellStyled = styled.th`
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    background-color: #607085;
    text-transform: uppercase;
    padding: 12px 24px;
    height: 45px;
    text-align: left;
    // TODO: update background for sorting column 
`
const BodyCellStyled = styled.td`
    font-size: 12px
    height: 45px
    background: #fff;
    padding: 12px 24px;
    text-align: left;
`

export interface ITableItem {
  [key: string]: unknown;
}

interface IProps {
  data: ITableItem[];
}

const Table = ({data}: IProps) => {
  const headers = extractTableData(data);

  return (
    <div>
      <TableStyled>
        <thead>
        <tr>
          {headers.map((headerItem, index) => {
            return <HeaderCellStyled key={index} scope="col">{headerItem}</HeaderCellStyled>
          })}
        </tr>
        </thead>

        <tbody>
        {data.map((singleItem, index) => (
            <tr key={index}>
              {
                headers.map((headerItem, columnIndex) => {
                  return <BodyCellStyled key={columnIndex}>{(singleItem as any)[headerItem]}</BodyCellStyled>
                })
              }
            </tr>
          )
        )}
        </tbody>
      </TableStyled>
    </div>
  )
}

export default Table;
