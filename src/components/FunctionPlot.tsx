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
  ScatterChart,
  Scatter,
} from 'recharts';

interface Individual {
  x: number;
  y: number;
}

interface Props {
  resultsFloat: Individual[];
  resultsInteger: Individual[];
  xMin: number;
  xMax: number;
}

const FunctionPlot: React.FC<Props> = ({ resultsFloat, resultsInteger, xMin, xMax }) => {
  const step = (xMax - xMin) / 1000;
  const data = Array.from({ length: 1000 }, (_, i) => {
    const x = xMin + i * step;
    const y = Math.pow(x - 1.5, 3) + 3;
    return { x, y };
  });

  const points: { name: string; x: number; y: number; color: string }[] = [];

  if (resultsFloat.length > 0) {
    const bestFloat = resultsFloat[resultsFloat.length - 1];
    points.push({
      name: 'Вещественное',
      x: bestFloat.x,
      y: Math.pow(bestFloat.x - 1.5, 3) + 3, 
      color: '#9333ea', 
    });
  }

  if (resultsInteger.length > 0) {
    const bestInteger = resultsInteger[resultsInteger.length - 1];
    points.push({
      name: 'Целочисленное',
      x: bestInteger.x,
      y: Math.pow(bestInteger.x - 1.5, 3) + 3, 
      color: '#dc2626', 
    });
  }

  const theoreticalX = 1.5;
  const theoreticalY = Math.pow(theoreticalX - 1.5, 3) + 3;

  points.push({
    name: 'Теоретическая точка перегиба',
    x: theoreticalX,
    y: theoreticalY,
    color: '#16a34a', 
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">График функции f(x) = (x - 1.5)³ + 3</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            domain={[xMin, xMax]}
            tickFormatter={(value: number) => value.toFixed(2)}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(value: number) => value.toFixed(2)}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" name="f(x) = (x - 1.5)³ + 3" />

          <ScatterChart>
            {points.map((point, index) => (
              <Scatter
                key={index}
                data={[{ x: point.x, y: point.y }]}
                fill={point.color}
                shape="circle"
                name={point.name}
                r={6}
              />
            ))}
          </ScatterChart>
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-indigo-500 mr-2"></div>
          <span>f(x) = (x - 1.5)³ + 3</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 mr-2"></div>
          <span>Целочисленное ({points.find(p => p.name === 'Целочисленное')?.x.toFixed(4)}, {points.find(p => p.name === 'Целочисленное')?.y.toFixed(4)})</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-500 mr-2"></div>
          <span>Вещественное ({points.find(p => p.name === 'Вещественное')?.x.toFixed(4)}, {points.find(p => p.name === 'Вещественное')?.y.toFixed(4)})</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 mr-2"></div>
          <span>Точка перегиба ({theoreticalX.toFixed(4)}, {theoreticalY.toFixed(4)})</span>
        </div>
      </div>
    </div>
  );
};

export default FunctionPlot;