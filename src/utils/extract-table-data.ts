import {ITableItem} from "../components/table.tsx";

export const extractTableData = (data: ITableItem[]) => {
  return Object.keys(data[0]);
}
