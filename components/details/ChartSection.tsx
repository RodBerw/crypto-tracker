import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ChartSection({
  chartData,
  setFilterRange,
  filterRange,
}: {
  chartData: any[];
  setFilterRange: React.Dispatch<React.SetStateAction<number>>;
  filterRange: number;
}) {
  const daysMap: { [key: number]: string } = {
    7: "7 days",
    30: "30 days",
    90: "3 months",
    365: "1 year",
  };
  return (
    <div className="bg-gray-800 border-1 border-gray-700 rounded-2xl p-4 shadow-inner">
      <div className="w-full flex gap-2 justify-between items-start">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          📈Price Trend ({daysMap[filterRange]})
        </h2>
        <Dropdown>
          <DropdownTrigger>
            <Button className=" bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-md">
              {daysMap[filterRange]}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            onAction={(key) => setFilterRange(Number(key))}
          >
            <DropdownItem key="7">7 days</DropdownItem>
            <DropdownItem key="30">30 days</DropdownItem>
            <DropdownItem key="90">3 months</DropdownItem>
            <DropdownItem key="365">1 year</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            fontSize={10}
            tick={{ fill: "#aaa" }}
            tickFormatter={(date) =>
              new Date(date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
              })
            }
          />
          <YAxis
            tick={{ fill: "#aaa" }}
            domain={["dataMin", "dataMax"]}
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#222",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value) => [
              `$${value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}`,
              "Price",
            ]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#facc15"
            strokeWidth={2.5}
            activeDot={{ r: 6 }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
