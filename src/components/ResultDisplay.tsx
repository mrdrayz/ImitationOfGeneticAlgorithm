import React from 'react';
import { Generation } from '../utils/geneticAlgorithm';

interface Props {
  resultsFloat: Generation[];
  resultsInteger: Generation[];
}

const ResultDisplay: React.FC<Props> = ({ resultsFloat, resultsInteger }) => {
  const bestFloat = resultsFloat[resultsFloat.length - 1].best;
  const bestInteger = resultsInteger[resultsInteger.length - 1].best;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Результаты</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded">
          <h3 className="font-medium mb-2">Вещественное кодирование (Вариант Б)</h3>
          <p><strong>Лучшая особь:</strong> x = {bestFloat.x.toFixed(6)}, y = {(Math.pow(bestFloat.x - 1.5, 3) + 3).toFixed(6)}</p>
          <p><strong>Поколений:</strong> {resultsFloat.length}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-medium mb-2">Целочисленное кодирование (Вариант А)</h3>
          <p><strong>Лучшая особь:</strong> x = {bestInteger.x.toFixed(6)}, y = {(Math.pow(bestInteger.x - 1.5, 3) + 3).toFixed(6)}</p>
          <p><strong>Поколений:</strong> {resultsInteger.length}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium">Таблица лучших по поколениям:</h3>
        <table className="min-w-full mt-2 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Поколение</th>
              <th className="border border-gray-300 p-2">Float X</th>
              <th className="border border-gray-300 p-2">Float Y</th>
              <th className="border border-gray-300 p-2">Integer X</th>
              <th className="border border-gray-300 p-2">Integer Y</th>
            </tr>
          </thead>
          <tbody>
            {resultsFloat.map((gen, index) => {
              const intGen = resultsInteger[index];
              return (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{index}</td>
                  <td className="border border-gray-300 p-2">{gen.best.x.toFixed(6)}</td>
                  <td className="border border-gray-300 p-2">{(Math.pow(gen.best.x - 1.5, 3) + 3).toFixed(6)}</td>
                  <td className="border border-gray-300 p-2">{intGen.best.x.toFixed(6)}</td>
                  <td className="border border-gray-300 p-2">{(Math.pow(intGen.best.x - 1.5, 3) + 3).toFixed(6)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultDisplay;