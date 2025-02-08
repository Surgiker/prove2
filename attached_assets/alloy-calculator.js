import React, { useState } from 'react';

const AlloyCalculator = () => {
  const [composition, setComposition] = useState({
    copper: 55,
    zinc: 30,
    nickel: 15
  });

  const constraints = {
    copper: { min: 47, max: 64 },
    zinc: { min: 15, max: 42 },
    nickel: { min: 10, max: 25 }
  };

  const handleSliderChange = (changedMetal, newValue) => {
    newValue = Math.round(Number(newValue) * 10) / 10;
    
    const otherMetals = Object.keys(composition).filter(m => m !== changedMetal);
    const metal1 = otherMetals[0];
    const metal2 = otherMetals[1];
    
    // Calcola lo spazio rimanente
    const remaining = 100 - newValue;
    
    // Mantieni il rapporto tra gli altri due metalli
    const currentRatio = composition[metal1] / composition[metal2];
    let newMetal1 = Math.round((remaining * currentRatio / (1 + currentRatio)) * 10) / 10;
    let newMetal2 = Math.round((remaining - newMetal1) * 10) / 10;

    // Verifica che i nuovi valori rispettino i vincoli
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

  // Funzione per formattare i numeri con un decimale
  const formatNumber = (num) => num.toFixed(1);

  return (
    <div className="calculator">
      <h1>Calcolatore Composizione Alpacca</h1>
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
    </div>
  );
};

export default AlloyCalculator;