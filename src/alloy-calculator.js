import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AlloyCalculator = () => {
  const [composition, setComposition] = useState({
    copper: 55,
    zinc: 30,
    nickel: 15
  });

  const [prices] = useState({
    copper: 7,
    zinc: 25,
    nickel: 80
  });

  const constraints = {
    copper: { min: 47, max: 64 },
    zinc: { min: 15, max: 42 },
    nickel: { min: 10, max: 25 }
  };

  const metalColors = {
    copper: '#b87333', // Colore ramato
    zinc: '#d8d8d8',  // Grigio chiaro
    nickel: '#808080'  // Grigio scuro
  };

  const handleSliderChange = (changedMetal, newValue) => {
    newValue = Math.round(Number(newValue) * 10) / 10;
    
    const otherMetals = Object.keys(composition).filter(m => m !== changedMetal);
    const metal1 = otherMetals[0];
    const metal2 = otherMetals[1];
    
    const remaining = 100 - newValue;
    
    const currentRatio = composition[metal1] / composition[metal2];
    let newMetal1 = Math.round((remaining * currentRatio / (1 + currentRatio)) * 10) / 10;
    let newMetal2 = Math.round((remaining - newMetal1) * 10) / 10;

    if (newMetal1 < constraints[metal1].min) {
      newMetal1 = constraints[metal1].min;
      newMetal2 = remaining - newMetal1;
    } else if (newMetal1 > constraints[metal1].max) {
      newMetal1 = constraints[metal1].max;
      newMetal2 = remaining - newMetal1;
    }

    if (newMetal2 < constraints[metal2].min) {
      newMetal2 = constraints[metal2].min;
      newMetal1 = remaining - newMetal2;
    } else if (newMetal2 > constraints[metal2].max) {
      newMetal2 = constraints[metal2].max;
      newMetal1 = remaining - newMetal2;
    }

    setComposition({
      ...composition,
      [changedMetal]: newValue,
      [metal1]: newMetal1,
      [metal2]: newMetal2
    });
  };

  const calculateAlloyColor = () => {
    const colors = Object.entries(composition).map(([metal, percentage]) => ({
      color: metalColors[metal],
      weight: percentage / 100
    }));
    
    return chroma.average(
      colors.map(c => c.color),
      'rgb',
      colors.map(c => c.weight)
    );
  };

  const calculateCost = () => {
    return Object.entries(composition).reduce((total, [metal, percentage]) => {
      return total + (prices[metal] * percentage / 100);
    }, 0).toFixed(2);
  };

  const chartData = {
    labels: Object.keys(composition).map(metal => 
      metal.charAt(0).toUpperCase() + metal.slice(1)
    ),
    datasets: [
      {
        data: Object.values(composition),
        backgroundColor: Object.keys(composition).map(metal => metalColors[metal]),
        borderColor: Array(3).fill('#fff'),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const formatNumber = (num) => num.toFixed(1);

  return (
    <div className="calculator">
      <h1>Calcolatore lega Alpacca</h1>
      
      <div className="chart-container">
        <div className="pie-chart">
          <Pie data={chartData} options={chartOptions} />
        </div>
        <div 
          className="color-preview"
          style={{
            backgroundColor: calculateAlloyColor(),
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            margin: '20px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <div className="sliders">
        {Object.entries(composition).map(([metal, value]) => (
          <div key={metal} className="slider-group">
            <label>
              {metal.charAt(0).toUpperCase() + metal.slice(1)}: {formatNumber(value)}%
            </label>
            <input
              type="range"
              min={constraints[metal].min}
              max={constraints[metal].max}
              value={value}
              step="0.1"
              onChange={(e) => handleSliderChange(metal, e.target.value)}
            />
            <span className="constraints">
              ({constraints[metal].min}% - {constraints[metal].max}%)
            </span>
          </div>
        ))}
      </div>

      <div className="prices">
        <h3>Prezzi metalli (€/kg)</h3>
        {Object.entries(prices).map(([metal, price]) => (
          <div key={metal} className="price-item">
            <span>{metal.charAt(0).toUpperCase() + metal.slice(1)}: {price.toFixed(2)} €/kg</span>
          </div>
        ))}
      </div>

      <div className="total">
        Costo lega: {calculateCost()} €/kg
      </div>
    </div>
  );
};

export default AlloyCalculator;
