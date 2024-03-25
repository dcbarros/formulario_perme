import React from "react";
import {
  StyledDataTable,
  ButtonsArea,
  StyledCell,
  StyledLink,
} from "./TableStyled";
import Button from "../Button/Button";

const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
  rowsPerPage: 5,
  noRowsPerPage: true,
};

const Table = ({
  type,
  database,
  handleDeleteFisio,
  loading,
  totalRows,
  onChangeRowsPerPage,
  onChangePage,
}) => {
  // Verifica se database é uma array antes de usá-lo
  var moment = require("moment");

  const adjustedData = Array.isArray(database)
    ? database.map((item) => {
        const admissionsData =
          item.admissions && item.admissions.length > 0
            ? item.admissions[0]
            : {};
        const { admissions: admissionsRest, ...rest } = item;
        return { ...rest, ...admissionsData };
      })
    : [];

  let columns;

  switch (type) {
    case "pacient":
      columns = [
        {
          name: "Fisioterapeuta",
          selector: (row) => row.fisioterapeuta || "N/A",
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">
              {row.fisioterapeuta}
            </StyledCell>
          ),
        },
        {
          name: "Identificador",
          selector: (row) => row.identifier || "N/A",
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">{row.identifier}</StyledCell>
          ),
        },
        {
          name: "Ala",
          selector: (row) => row.admissions[0]?.hospitalSector || "N/A",
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">
              {row.admissions[0]?.hospitalSector}
            </StyledCell>
          ),
        },
        {
          name: "Data de Aferição",
          selector: (row) =>
            row.admissions[0]?.measurements[0]?.createdAt || "N/A",
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">
              {row.admissions[0]?.measurements[0]?.createdAt}
            </StyledCell>
          ),
        },
        {
          name: "Score Perme",
          selector: (row) => row.admissions[0]?.measurements[0]?.score || "N/A",
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">
              {row.admissions[0]?.measurements[0]?.score}
            </StyledCell>
          ),
        },
      ];
      break;
    case "physiotherapist":
      columns = [
        {
          name: "Fisioterapeuta",
          selector: (row) => row.name,
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">{row.name}</StyledCell>
          ),
        },
        {
          name: "Identificador",
          selector: (row) => row.identifier,
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">{row.identifier}</StyledCell>
          ),
        },
        {
          name: "Gerenciar",
          cell: (row) => (
            <ButtonsArea>
              <StyledLink to={`editar/${row.id}`}>
                <Button id="ButtonSmall" text="Editar" type="submit"></Button>
              </StyledLink>
              <Button
                id="ButtonSmallPink"
                text="Excluir"
                type="submit"
                onClick={() => handleDeleteFisio(row.id)}
              ></Button>
            </ButtonsArea>
          ),
        },
      ];
      break;
    default:
      columns = [
        {
          name: "Paciente",
          selector: (row) => {
            if (row && row.patientName) {
              return row.patientName;
            }
            return "";
          },
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">
              {row && row.patientName}
            </StyledCell>
          ),
        },
        {
          name: "Prontuário",
          selector: (row) => {
            if (row.patientInternalCode) {
              return row.patientInternalCode;
            }
            return "";
          },
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">
              {row && row.patientInternalCode}
            </StyledCell>
          ),
        },
        {
          name: "Ala",
          selector: (row) => {
            if (row.measurement.latestMeasurementHospitalSector) {
              return;
            }
            return "";
          },
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">
              {row && row.measurement.latestMeasurementHospitalSector}
            </StyledCell>
          ),
        },
        {
          name: "Data de Alta",

          selector: (row) => {
            if (row && row.dischargedAt && row.dischargedAt.length > 0) {
              //   return row.dischargedAt;
              return moment(row.dischargedAt).format("DD/MM/YYYY");
            }
            return "";
          },
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">
              {row && row.dischargedAt && row.dischargedAt.length > 0
                ? moment(row.dischargedAt).format("DD/MM/YYYY")
                : ""}
            </StyledCell>
          ),
        },
        {
          name: "Última aferição",
          selector: (row) => {
            if (row.measurement.latestMeasurementData) {
              return;
            }
            return "";
          },

          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">
              {row &&
                moment(row.measurement.latestMeasurementData).format(
                  "DD/MM/YYYY"
                )}
            </StyledCell>
          ),
        },
        {
          name: "Último score",
          selector: (row) => {
            if (row.measurement.latestMeasurementScore) {
              return;
            }
            return "";
          },
          sortable: true,
          cell: (row) => (
            <StyledCell className="custom-cell">
              {row && row.measurement.latestMeasurementScore}
            </StyledCell>
          ),
        },
      ];
  }

  return (
    <StyledDataTable
      columns={columns}
      data={adjustedData}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onChangePage={onChangePage}
      paginationComponentOptions={paginationComponentOptions}
      paginationPerPage={5}
    ></StyledDataTable>
  );
};

export default Table;
