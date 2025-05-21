import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Currency } from "../types";
import { formatCurrency } from "../utils/calculations";

interface ChartDataPoint {
  year: number;
  portfolioValue: number;
  withdrawal: number;
  returns: number;
}

interface PortfolioChartProps {
  data: ChartDataPoint[];
  currency: Currency;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data, currency }) => {
  return (
    <div className="mb-4 mt-4 h-[300px] border-3 border-black p-2 bg-white">
      <h4 className="font-brutal font-bold mb-2 text-center">
        Portfolio Value Over Time
      </h4>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{
              value: "Year",
              position: "insideBottomRight",
              offset: -10,
            }}
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(value, currency.symbol)}
            label={{
              value: "Amount",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip
            formatter={(value) => [
              formatCurrency(value as number, currency.symbol),
            ]}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="portfolioValue"
            name="Portfolio Value"
            stroke="#0F766E"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="withdrawal"
            name="Withdrawal"
            stroke="#BE123C"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="returns"
            name="Returns"
            stroke="#047857"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
