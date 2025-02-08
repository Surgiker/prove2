import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import MetalSlider from "../components/MetalSlider";
import CompositionChart from "../components/CompositionChart";
import ColorPreview from "../components/ColorPreview";
import PriceDisplay from "../components/PriceDisplay";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface StrictComposition {
  copper: number;
  zinc: number;
  nickel: number;
}

const defaultComposition: StrictComposition = {
  copper: 55,
  zinc: 30,
  nickel: 15,
};

const constraints: { [key in keyof StrictComposition]: { min: number; max: number } } = {
  copper: { min: 47, max: 64 },
  zinc: { min: 15, max: 42 },
  nickel: { min: 10, max: 25 },
};

const defaultPrices: StrictComposition = {
  copper: 7.00,
  zinc: 25.00,
  nickel: 80.00,
};

export default function AlloyCalculator() {
  const [composition, setComposition] = useState<StrictComposition>(defaultComposition);
  const { theme, setTheme } = useTheme();

  const handleSliderChange = (metal: keyof StrictComposition, newValue: number) => {
    const roundedValue = Math.round(newValue * 10) / 10;
    const otherMetals = Object.keys(composition).filter(m => m !== metal) as (keyof StrictComposition)[];
    const [metal1, metal2] = otherMetals;

    const remaining = 100 - roundedValue;
    const currentRatio = composition[metal1] / composition[metal2];

    let newMetal1 = Math.round((remaining * currentRatio / (1 + currentRatio)) * 10) / 10;
    let newMetal2 = Math.round((remaining - newMetal1) * 10) / 10;

    // Adjust values to respect constraints
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
      [metal]: roundedValue,
      [metal1]: newMetal1,
      [metal2]: newMetal2,
    });
  };

  const handleReset = () => {
    setComposition(defaultComposition);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Calcolatore lega Alpacca</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <CompositionChart composition={composition} />
              <ColorPreview composition={composition} />
            </div>

            {Object.entries(composition).map(([metal, value]) => (
              <MetalSlider
                key={metal}
                metal={metal as keyof StrictComposition}
                value={value}
                constraints={constraints[metal as keyof StrictComposition]}
                onChange={(newValue) => handleSliderChange(metal as keyof StrictComposition, newValue)}
              />
            ))}

            <Button
              className="w-full mt-4"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>

          <div>
            <PriceDisplay
              composition={composition}
              prices={defaultPrices}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
