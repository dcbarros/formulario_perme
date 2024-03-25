import React from "react";
import Button from "../Button/Button"; // Importe o componente de botão aqui

function convertArrayOfObjectsToCSV(array) {
  let result;
  const columnDelimiter = "\t";
  const lineDelimiter = "\n";
  const translationMap = {
    patientName: "Nome",
    patientInternalCode: "Prontuário",
    dischargedAt: "Data da Alta",
    "measurement.latestMeasurementData": "Data da Perme",
    "measurement.latestMeasurementScore": "Score",
    "measurement.latestMeasurementScoreTitle": "Classificação",
    "measurement.latestMeasurementHospitalSector": "Ala Hospitalar",
  };

  const keys = [
    "patientName",
    "patientInternalCode",
    "dischargedAt",
    "measurement.latestMeasurementData",
    "measurement.latestMeasurementScore",
    "measurement.latestMeasurementScoreTitle",
    "measurement.latestMeasurementHospitalSector",
  ];

  const translatedKeys = keys.map((key) => translationMap[key] || key);

  result = translatedKeys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    const lastMeasurement = item.measurement;

    if (lastMeasurement) {
      const row = keys.map((key) => {
        const keyParts = key.split(".");
        if (keyParts.length === 1) {
          return item[keyParts[0]];
        } else {
          return lastMeasurement[keyParts[1]];
        }
      });

      result += row.join(columnDelimiter);
      result += lineDelimiter;
    }
  });

  return result;
}
function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "Histórico Dashboard.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

const ExportButton = ({ data }) => {
  const handleExport = () => {
    downloadCSV(data);
  };

  return (
    <Button id="ButtonMedium" text="EXPORTAR" onClick={handleExport}></Button>
  );
};

export default ExportButton;
