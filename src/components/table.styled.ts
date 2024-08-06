import styled, {css} from "styled-components";

export const tableGenericCellStyle = css`
    font-size: 12px;
    height: 45px;
    font-family: 'Lato', sans-serif;
`

export const TableStyled = styled.table`
    border-collapse: collapse;
`;
export const HeaderCellStyled = styled.th<{isSorted: boolean}>`
    ${tableGenericCellStyle};

    color: white;
    background-color: ${props => props.isSorted ? '#435060' : '#607085'};
    text-transform: uppercase;
    padding: 12px 24px;
    text-align: left;
    place-items: center;
`
export const HeaderCellSortableContainerStyled = styled.div`
    display: flex;
    flex-direction: row;

    &:hover {
        opacity: 0.8;
    }
`
export const HeaderCellContainerStyled = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    cursor: pointer;
    place-items: center;
`;
export const BodyCellStyled = styled.td`
    ${tableGenericCellStyle};

    padding: 12px 24px;
    text-align: left;
`

export const SortIconStyled = styled.img`
    width: 16px;
    height: 16px;
`;

export const TableRowStyled = styled.tr`
    border-bottom: 1px solid #607085;
`
