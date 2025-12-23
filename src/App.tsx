import React from 'react';
import GeneticAlgorithmForm from './components/GeneticAlgorithmForm';
import ResultDisplay from './components/ResultDisplay';
import FunctionPlot from './components/FunctionPlot';
import ErrorPlot from './components/ErrorPlot'; 
import { useGeneticAlgorithm } from './hooks/useGeneticAlgorithm';

function App() {
  const { resultsFloat, resultsInteger, loading, runAlgorithm } = useGeneticAlgorithm();

  const [params, setParams] = React.useState<{ xMin: number; xMax: number } | null>(null);

  const handleRun = (params: any) => {
    setParams({ xMin: params.xMin, xMax: params.xMax });
    runAlgorithm(params);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Генетический Алгоритм</h1>
      <GeneticAlgorithmForm onRun={handleRun} loading={loading} />
      {resultsFloat && resultsInteger && params && (
        <>
          <ResultDisplay resultsFloat={resultsFloat} resultsInteger={resultsInteger} />
          <FunctionPlot
            resultsFloat={resultsFloat.map(g => g.best)}
            resultsInteger={resultsInteger.map(g => g.best)}
            xMin={params.xMin}
            xMax={params.xMax}
          />
          <ErrorPlot
            results={resultsFloat.map((gen, index) => ({
              generation: index,
              avgY: gen.avgY,
            }))}
          />
        </>
      )}
    </div>
  );
}

export default App;