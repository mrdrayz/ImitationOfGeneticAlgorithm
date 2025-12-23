import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  results: { generation: number; avgY: number }[];
}

const ErrorPlot: React.FC<Props> = ({ results }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">График ошибки (среднее значение функции по поколениям)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={results}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="generation" tickFormatter={(value) => value} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="avgY" 
            stroke="#8884d8" 
            strokeWidth={3} 
            name="Среднее значение" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ErrorPlot;