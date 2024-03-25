// DataTableStyles.js
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { primary, textdark, textlight } from "../../utils/colors";
import { toRem } from "../../utils/toRem";
import { Link } from "react-router-dom";

export const StyledDataTable = styled(DataTable)`
  font-family: "lato";

  //header
  .rdt_TableHeadRow {
    background-color: ${primary};
    font-size: ${toRem(16)};
    color: ${textlight};
    min-height: 48px;
    padding: 0px;
  }
  //header
  .cWtqHX .sc-jdHHBG {
    padding: inherit;
  }

  .cWtqHX {
    padding: ${toRem(0)};
  }
  //pagination
`;

export const StyledCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  width: 100%;
  box-sizing: border-box;
  font-size: ${toRem(12)};
  font-weight: 400;
  color: ${textdark};
  background-color: ${textlight};
  min-height: 48px;
`;

export const ButtonsArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toRem(8)};
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
`;
