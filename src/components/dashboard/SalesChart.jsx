import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  {
    name: "05-10-23",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "06-10-23",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "07-10-23",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "08-10-23",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "09-10-23",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "10-10-23",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "11-10-23",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function SalesChart() {
  return (
    <LineChart
    width={500}
    height={200}
    data={data}
    syncId="anyId"
    margin={{
      top: 10,
      right: 30,
      left: 0,
      bottom: 0
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
  </LineChart>
  );
}
