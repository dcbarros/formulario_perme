import React, { useState, useEffect } from "react";
import Text from "../../components/Text/Text";
import Graphic from "../../components/Graphic/Graphic";
import Table from "../../components/Table/Table";
import {
  ContainerDashboard,
  GraphicArea,
  CardsContainers,
  StyledCard,
  FilterRow,
  ButtonArea,
  DatepickerArea,
} from "./DashboardPageStyled";
import FilterForm from "../../components/FilterForm/FilterForm";
import ExportButton from "../../components/ExportButton/ExportButton";
import Datepicker from "../../components/Datepicker/Datepicker";
import api from "../../services/api";
import moment from "moment";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [graphicData, setGraphicData] = useState([]);
  const [activePatients, setActivePatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [exportData, setExportData] = useState([]);

  const montarGrafico = (arrayDeDadosParaOGrafico) => {
    // Criando um array para armazenar os dados por mês
    let dadosPorMesArray = [];

    // Iterando sobre cada objeto de pacientes
    arrayDeDadosParaOGrafico.forEach((paciente) => {
      // Obtendo a data de alta do paciente
      const dataAlta =
        paciente.dischagedAt && paciente.dischagedAt.length > 0
          ? paciente.dischagedAt
          : null;

      // Verificando se há dados de alta e obtendo o mês e o ano
      if (dataAlta) {
        const dataAltaObj = new Date(dataAlta);
        const mesAno = `${(dataAltaObj.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${dataAltaObj.getFullYear()}`;

        // Verificando se já existe um objeto para o mês
        const mesExistente = dadosPorMesArray.find(
          (dadosMes) => dadosMes.dataMes === mesAno
        );

        if (mesExistente) {
          // Se já existir, incrementa os contadores
          mesExistente.pacients++;

          if (paciente.dischagedType === "Alta da fisioterapia") {
            mesExistente.physiodischarge++;
          } else if (paciente.dischagedType === "Alta hospitalar") {
            mesExistente.hospitaldischarge++;
          }
        } else {
          // Se não existir, cria um novo objeto para o mês
          const novoDadosPorMes = {
            dataOrder: parseInt(
              `${dataAltaObj.getFullYear()}${(dataAltaObj.getMonth() + 1)
                .toString()
                .padStart(2, "0")}`
            ),
            dataMes: mesAno,
            date: `01-${(dataAltaObj.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${dataAltaObj.getFullYear()}`,
            pacients: 1,
            physiodischarge:
              paciente.dischagedType === "Alta da fisioterapia" ? 1 : 0,
            hospitaldischarge:
              paciente.dischagedType === "Alta hospitalar" ? 1 : 0,
          };

          dadosPorMesArray.push(novoDadosPorMes);
          setGraphicData(dadosPorMesArray);
        }
      }
    });
    dadosPorMesArray = dadosPorMesArray.sort((a, b) => {
      if (a.dataOrder > b.dataOrder) {
        return 1;
      }
      if (a.dataOrder < b.dataOrder) {
        return -1;
      }
      return 0;
    });
    setGraphicData(dadosPorMesArray);
  };

  const handleFilterChange = (value) => {
    setFilterType(value);

    if (value === "VerTodos") {
      setFilteredData(data);
    } else {
      const newData = data.filter((row) => {
        const measurements = row.measurement;

        if (measurements.latestMeasurementHospitalSector.length > 0) {
          const lastMeasurement = measurements.latestMeasurementHospitalSector;
          return lastMeasurement === value;
        }
        return false;
      });

      setFilteredData(newData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activePatientsResponse = await api.get("/admission");
        const activePatientData = activePatientsResponse.data;
        const activePatient = activePatientData.filter(
          (patient) => patient.dischargedAt === null
        ).length;

        setActivePatients(activePatient);

        const graphResponse = await api.get("/admission/graph");
        const graphData = graphResponse.data;

        montarGrafico(graphData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const fetchTableData = async (page) => {
    try {
      const allPatientsResponse = await api.get(
        "/admission/table?limit=1000&offset=0"
      );
      const allPatiensData = allPatientsResponse.data;

      setLoading(true);
      const tableResponse = await api.get(
        `/admission/table?limit=${perPage}&offset=${(page - 1) * perPage}`
      );
      const tableData = tableResponse.data;

      setTotalRows(allPatiensData.length);
      setData(tableData);
      setFilteredData(tableData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fecthExportTable = async () => {
    try {
      const exportTableResponse = await api.get(
        `/admission/table?limit=1000&offset=0`
      );
      const exportTable = exportTableResponse.data;

      exportTable.forEach((element) => {
        element.dischargedAt = moment(element.dischargedAt).format(
          "DD/MM/YYYY"
        );

        element.measurement.latestMeasurementData = moment(
          element.measurement.latestMeasurementData
        ).format("DD/MM/YYYY");
      });
      setExportData(exportTable);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTableData(1);
    fecthExportTable();
  }, []);

  // Função para alterar a página e atualizar o URL

  const handlePageChange = (page) => {
    fetchTableData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const handleYearChange = (value) => {
    setSelectedYear(value);
  };
  const getYearFromSelectedDate = () => {
    const year = selectedYear;
    return year;
  };

  const isSmallScreen = window.innerWidth <= 414;

  return (
    <ContainerDashboard>
      <CardsContainers>
        <StyledCard>
          <Text
            id={isSmallScreen ? "TextoCorridoBold" : "Subtitulo"}
            text="Pacientes Ativos:"
          ></Text>
          <Text id="TituloScore" text={activePatients}></Text>
        </StyledCard>
        <GraphicArea>
          <Graphic
            data={graphicData}
            type="dashboard"
            yearToDisplay={getYearFromSelectedDate()}
          />
        </GraphicArea>
        <DatepickerArea>
          <Datepicker
            type="date"
            id="datePicker"
            value={selectedYear}
            onChange={handleYearChange}
          ></Datepicker>
        </DatepickerArea>
      </CardsContainers>
      <FilterRow>
        <Text
          id={isSmallScreen ? "TextoCorridoBold" : "Subtitulo"}
          text="Histórico dos pacientes"
        ></Text>

        <FilterForm
          filterType="FilterBy"
          onFilterChange={handleFilterChange}
        ></FilterForm>
      </FilterRow>

      <Table
        type=""
        filterType={filterType}
        database={filteredData}
        loading={loading}
        totalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
      ></Table>
      <ButtonArea>
        <ExportButton data={exportData} />
      </ButtonArea>
    </ContainerDashboard>
  );
};

export default DashboardPage;
