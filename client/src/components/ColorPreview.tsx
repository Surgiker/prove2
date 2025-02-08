import React from 'react';

const metalColors: { [key: string]: string } = {
  copper: '#b87333',
  zinc: '#d8d8d8',
  nickel: '#808080',
};

interface MetalComposition {
  [key: string]: number;
}

interface ColorPreviewProps {
  composition: MetalComposition;
}

export default function ColorPreview({ composition }: ColorPreviewProps) {
  const calculateMixedColor = () => {
    const r = Object.entries(composition).reduce((acc, [metal, percentage]) => {
      const color = metalColors[metal as keyof typeof metalColors]; // Corretto con cast di tipo
      const r = parseInt(color.slice(1, 3), 16);
      return acc + (r * percentage / 100);
    }, 0);

    const g = Object.entries(composition).reduce((acc, [metal, percentage]) => {
      const color = metalColors[metal as keyof typeof metalColors];
      const g = parseInt(color.slice(3, 5), 16);
      return acc + (g * percentage / 100);
    }, 0);

    const b = Object.entries(composition).reduce((acc, [metal, percentage]) => {
      const color = metalColors[metal as keyof typeof metalColors];
      const b = parseInt(color.slice(5, 7), 16);
      return acc + (b * percentage / 100);
    }, 0);

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };

  return (
    <div
      className="w-20 h-20 rounded-full border-2 border-border shadow-md"
      style={{
        backgroundColor: calculateMixedColor(),
      }}
      title="Anteprima colore approssimativo"
    />
  );
}
