import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { primary, secondary, quaternary } from "../../utils/colors";
import { StyledLineChart } from "./GraphicStyled";

const filterDataByMonth = (data, yearToDisplay) => {
  return data.filter((item) => {
    const [day, month, year] = item.date.split("-");
    return year === yearToDisplay;
  });
};

const formatDate = (value) => {
  const [month, year] = value.split("-");
  return `${month}/${year}`;
};

const Graphic = ({ data, type, yearToDisplay }) => {
  const filteredData = filterDataByMonth(data, yearToDisplay);

  return (
    <ResponsiveContainer>
      {type === "dashboard" ? (
        <StyledLineChart data={filteredData}>
          <Line
            type="monotone"
            dataKey="pacients"
            name="Pacientes"
            stroke={`${primary}`}
          />
          <Line
            type="monotone"
            dataKey="hospitaldischarge"
            name="Altas hospitalares"
            stroke={`${secondary}`}
          />
          <Line
            type="monotone"
            dataKey="physiodischarge"
            name="Altas fisioterapia"
            stroke={`${quaternary}`}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
          <XAxis
            dataKey="dataMes"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => formatDate(value)}
          />
          <YAxis />
          <Legend
            layout="vertical"
            align="right"
            wrapperStyle={{
              position: "relative",
              fontSize: "10px",
              width: "32px",
              marginRight: "32px",
              alignSelf: "center",
            }}
          />
          <Tooltip />
        </StyledLineChart>
      ) : (
        <StyledLineChart data={data}>
          <Line
            type="monotone"
            dataKey="score"
            name="Score"
            stroke={`${primary}`}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <Tooltip /> <YAxis />
        </StyledLineChart>
      )}
    </ResponsiveContainer>
  );
};

export default Graphic;
