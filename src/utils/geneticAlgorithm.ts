export interface Individual {
  x: number;
  raw: number;
  y: number;
}

export interface Generation {
  population: Individual[];
  best: Individual;
  avgY: number; 
}

export interface GAParams {
  populationSize: number;
  generations: number;
  crossoverRate: number;
  mutationRate: number;
  xMin: number;
  xMax: number;
  encoding: 'integer' | 'float';
  crossoverType: 'single-point' | 'two-point'; 
  mutationType: '1-bit' | '2-bit'; 
}

export function runGeneticAlgorithm(params: GAParams): Generation[] {
  const { populationSize, generations, crossoverRate, mutationRate, xMin, xMax, encoding, crossoverType, mutationType } = params;

  const evaluate = (x: number): number => {
    return Math.pow(x - 1.5, 2); 
  };

  let population: Individual[];

  if (encoding === 'float') {
    const randomX = (): number => Math.random() * (xMax - xMin) + xMin;
    population = Array.from({ length: populationSize }, () => {
      let x = randomX();
      return { x, raw: x, y: evaluate(x) };
    });
  } else {
    const intMin = Math.ceil(xMin);
    const intMax = Math.floor(xMax);
    const range = intMax - intMin + 1;

    if (range <= 0) {
      throw new Error('Диапазон целых чисел пустой');
    }

    const randomInt = (): number => Math.floor(Math.random() * range) + intMin;
    population = Array.from({ length: populationSize }, () => {
      const raw = randomInt();
      const x = raw;
      return { x, raw, y: evaluate(x) };
    });
  }

  const results: Generation[] = [];

  for (let gen = 0; gen < generations; gen++) {
    population.sort((a, b) => a.y - b.y);
    const best = population[0];

    const avgY = population.reduce((sum, ind) => sum + ind.y, 0) / population.length;

    results.push({ population: [...population], best, avgY });

    const newPopulation: Individual[] = [];
    for (let i = 0; i < populationSize; i += 2) {
      const parent1 = population[Math.floor(Math.random() * population.length)];
      const parent2 = population[Math.floor(Math.random() * population.length)];

      let child1 = { ...parent1 };
      let child2 = { ...parent2 };

      if (Math.random() < crossoverRate) {
        if (encoding === 'float') {
          const alpha = Math.random();
          child1.x = alpha * parent1.x + (1 - alpha) * parent2.x;
          child2.x = alpha * parent2.x + (1 - alpha) * parent1.x;
        } else {
          const bits1 = parent1.raw.toString(2).padStart(16, '0'); 
          const bits2 = parent2.raw.toString(2).padStart(16, '0');

          let childBits1 = '';
          let childBits2 = '';

          if (crossoverType === 'single-point') {
            const point = Math.floor(Math.random() * 16);
            childBits1 = bits1.slice(0, point) + bits2.slice(point);
            childBits2 = bits2.slice(0, point) + bits1.slice(point);
          } else if (crossoverType === 'two-point') {
            const point1 = Math.floor(Math.random() * 16);
            const point2 = Math.floor(Math.random() * 16);
            const start = Math.min(point1, point2);
            const end = Math.max(point1, point2);

            childBits1 = bits1.slice(0, start) + bits2.slice(start, end) + bits1.slice(end);
            childBits2 = bits2.slice(0, start) + bits1.slice(start, end) + bits2.slice(end);
          }

          const childRaw1 = parseInt(childBits1, 2);
          const childRaw2 = parseInt(childBits2, 2);

          child1.x = childRaw1;
          child2.x = childRaw2;
          child1.raw = childRaw1;
          child2.raw = childRaw2;
        }
      }

      if (Math.random() < mutationRate) {
        if (encoding === 'float') {
          child1.x = Math.random() * (xMax - xMin) + xMin;
        } else {
          const bits = child1.raw.toString(2).padStart(16, '0');
          let mutatedBits = bits.split('');

          if (mutationType === '1-bit') {
            const bitIndex = Math.floor(Math.random() * 16);
            mutatedBits[bitIndex] = mutatedBits[bitIndex] === '0' ? '1' : '0';
          } else if (mutationType === '2-bit') {
            const bitIndex1 = Math.floor(Math.random() * 16);
            const bitIndex2 = Math.floor(Math.random() * 16);

            mutatedBits[bitIndex1] = mutatedBits[bitIndex1] === '0' ? '1' : '0';
            mutatedBits[bitIndex2] = mutatedBits[bitIndex2] === '0' ? '1' : '0';
          }

          const childRaw = parseInt(mutatedBits.join(''), 2);
          child1.x = childRaw;
          child1.raw = childRaw;
        }
      }
      if (Math.random() < mutationRate) {
        if (encoding === 'float') {
          child2.x = Math.random() * (xMax - xMin) + xMin;
        } else {
          const bits = child2.raw.toString(2).padStart(16, '0');
          let mutatedBits = bits.split('');

          if (mutationType === '1-bit') {
            const bitIndex = Math.floor(Math.random() * 16);
            mutatedBits[bitIndex] = mutatedBits[bitIndex] === '0' ? '1' : '0';
          } else if (mutationType === '2-bit') {
            const bitIndex1 = Math.floor(Math.random() * 16);
            const bitIndex2 = Math.floor(Math.random() * 16);

            mutatedBits[bitIndex1] = mutatedBits[bitIndex1] === '0' ? '1' : '0';
            mutatedBits[bitIndex2] = mutatedBits[bitIndex2] === '0' ? '1' : '0';
          }

          const childRaw = parseInt(mutatedBits.join(''), 2);
          child2.x = childRaw;
          child2.raw = childRaw;
        }
      }

      if (encoding === 'float') {
        child1.x = Math.max(xMin, Math.min(xMax, child1.x));
        child2.x = Math.max(xMin, Math.min(xMax, child2.x));
      } else {
        const intMin = Math.ceil(xMin);
        const intMax = Math.floor(xMax);

        child1.raw = Math.max(intMin, Math.min(intMax, child1.raw));
        child2.raw = Math.max(intMin, Math.min(intMax, child2.raw));
        child1.x = child1.raw;
        child2.x = child2.raw;
      }

      newPopulation.push({ x: child1.x, raw: child1.raw, y: evaluate(child1.x) });
      newPopulation.push({ x: child2.x, raw: child2.raw, y: evaluate(child2.x) });
    }

    population = newPopulation;
  }

  return results;
}