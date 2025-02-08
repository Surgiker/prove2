import React from 'react';

const metalColors = {
  copper: '#b87333',
  zinc: '#d8d8d8',
  nickel: '#808080'
};

interface ColorPreviewProps {
  composition: {
    copper: number;
    zinc: number;
    nickel: number;
  };
}

export default function ColorPreview({ composition }: ColorPreviewProps) {
  const calculateMixedColor = () => {
    const r = Object.entries(composition).reduce((acc, [metal, percentage]) => {
      const color = metalColors[metal];
      const r = parseInt(color.slice(1, 3), 16);
      return acc + (r * percentage / 100);
    }, 0);

    const g = Object.entries(composition).reduce((acc, [metal, percentage]) => {
      const color = metalColors[metal];
      const g = parseInt(color.slice(3, 5), 16);
      return acc + (g * percentage / 100);
    }, 0);

    const b = Object.entries(composition).reduce((acc, [metal, percentage]) => {
      const color = metalColors[metal];
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
