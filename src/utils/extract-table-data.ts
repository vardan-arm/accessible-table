import {ITableItem} from "../src/components/table.tsx";

export const extractTableData = (data: ITableItem[]) => {
  // const singleItem = Object.keys(data[0]);
  const headers = Object.keys(data[0])
console.log('headers: ', headers);
  return headers;
}
