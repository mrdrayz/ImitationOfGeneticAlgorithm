import React, { useState } from 'react';
import { GAParams } from '../utils/geneticAlgorithm';

interface Props {
  onRun: (params: GAParams) => void;
  loading: boolean;
}

const GeneticAlgorithmForm: React.FC<Props> = ({ onRun, loading }) => {
  const [params, setParams] = useState<GAParams>({
    populationSize: 50,
    generations: 100,
    crossoverRate: 0.8,
    mutationRate: 0.01,
    xMin: -5,
    xMax: 5,
    encoding: 'float',
    crossoverType: 'single-point', 
    mutationType: '1-bit', 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: name === 'encoding' || name === 'crossoverType' || name === 'mutationType'
        ? value
        : (name.includes('Rate') || name.includes('Point') ? parseFloat(value) : parseInt(value, 10))
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRun(params);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Вариант 3: Точка перегиба f(x) = (x - 1.5)³ + 3</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Размер популяции</label>
          <input
            type="number"
            name="populationSize"
            value={params.populationSize}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="10"
            max="1000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Количество поколений</label>
          <input
            type="number"
            name="generations"
            value={params.generations}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="10"
            max="10000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Вероятность кроссовера</label>
          <input
            type="number"
            step="0.01"
            name="crossoverRate"
            value={params.crossoverRate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            max="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Вероятность мутации</label>
          <input
            type="number"
            step="0.01"
            name="mutationRate"
            value={params.mutationRate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            max="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">X_min</label>
          <input
            type="number"
            name="xMin"
            value={params.xMin}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">X_max</label>
          <input
            type="number"
            name="xMax"
            value={params.xMax}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Кодирование</label>
          <select
            name="encoding"
            value={params.encoding}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="float">Вещественное (Вариант Б)</option>
            <option value="integer">Целочисленное (Вариант А)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Тип кроссинговера</label>
          <select
            name="crossoverType"
            value={params.crossoverType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="single-point">Одноточечный</option>
            <option value="two-point">Двуточечный</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Тип мутации</label>
          <select
            name="mutationType"
            value={params.mutationType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="1-bit">1 бит</option>
            <option value="2-bit">2 бита</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`mt-4 w-full py-2 px-4 rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
      >
        {loading ? 'Запуск...' : 'Запустить алгоритм'}
      </button>
    </form>
  );
};

export default GeneticAlgorithmForm;