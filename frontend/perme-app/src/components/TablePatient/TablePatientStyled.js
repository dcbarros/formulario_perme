import styled from "styled-components";
import DataTable from "react-data-table-component";
import { primary, textdark, textlight } from "../../utils/colors";
import { toRem } from "../../utils/toRem";
import { Link } from "react-router-dom";

export const TablePatientContainer = styled.div`
display:flex;
width:100%;
margin-top: ${toRem(24)};
`;

export const StyledTable = styled.table`
 width: 100%;
  box-sizing: border-box;
  font-size: ${toRem(12)};
  font-weight: 400;
  color: ${textdark};
  background-color: ${textlight};
  height: 48px;
  border-spacing: 0;  
  border-collapse: collapse;  
`;
export const StyledThead = styled.thead`
  background-color: ${primary};
  font-size: ${toRem(16)};
  color: ${textlight};
  height: ${toRem(48)}; 
  padding: 0px;
  border: none;
`;

export const StyledTr = styled.tr`
  justify-content: space-between;
  border-color:${primary};
`;

export const StyledTbody = styled.tbody`
  font-size: ${toRem(16)};
  color: ${textdark};
  height: ${toRem(48)}; 
  padding: 0px;
  width: 100%;
`;

export const StyledTd = styled.td`
padding: ${toRem(16)};
`