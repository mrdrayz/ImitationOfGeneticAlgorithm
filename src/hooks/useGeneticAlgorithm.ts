import { useState, useCallback } from 'react';
import { runGeneticAlgorithm, GAParams, Generation } from '../utils/geneticAlgorithm';

export const useGeneticAlgorithm = () => {
  const [resultsFloat, setResultsFloat] = useState<Generation[] | null>(null);
  const [resultsInteger, setResultsInteger] = useState<Generation[] | null>(null);
  const [loading, setLoading] = useState(false);

  const runAlgorithm = useCallback((params: GAParams) => {
    setLoading(true);
    setResultsFloat(null);
    setResultsInteger(null);

    setTimeout(() => {
      const floatResults = runGeneticAlgorithm({ ...params, encoding: 'float' });
      const integerResults = runGeneticAlgorithm({ ...params, encoding: 'integer' });

      setResultsFloat(floatResults);
      setResultsInteger(integerResults);
      setLoading(false);
    }, 100);
  }, []);

  return { resultsFloat, resultsInteger, loading, runAlgorithm };
};