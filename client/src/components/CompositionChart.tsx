import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const metalColors: { [key: string]: string } = {
  copper: '#b87333',
  zinc: '#d8d8d8',
  nickel: '#808080',
};

interface MetalComposition {
  [key: string]: number;
}

interface CompositionChartProps {
  composition: MetalComposition;
}

export default function CompositionChart({ composition }: CompositionChartProps) {
  const data = Object.entries(composition).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <ResponsiveContainer width={200} height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={metalColors[entry.name as keyof typeof metalColors] || '#000'} // Default nel caso di errore
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
