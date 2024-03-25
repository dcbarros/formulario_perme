import styled from "styled-components";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { primary, secondary, tertiary } from "../../utils/colors";
import { toRem } from "../../utils/toRem";

export const StyledLineChart = styled(LineChart)`
  background: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: ${toRem(344)};
  height: ${toRem(100)};
  font-size: 14px;
  box-sizing: border-box;
  &.dashboard {
    padding: ${toRem(0)} ${toRem(32)} ${toRem(0)} ${toRem(0)};
  }
  display: flex;
`;

export const ChartContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledLineChartPatient = styled(Line)`
  height: 500px; // Defina a altura desejada
`;