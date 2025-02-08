import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface MetalSliderProps {
  metal: string;
  value: number;
  constraints: {
    min: number;
    max: number;
  };
  onChange: (value: number) => void;
}

export default function MetalSlider({ metal, value, constraints, onChange }: MetalSliderProps) {
  const formatLabel = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <Label>{formatLabel(metal)}: {value.toFixed(1)}%</Label>
        <span className="text-sm text-muted-foreground">
          ({constraints.min}% - {constraints.max}%)
        </span>
      </div>
      <Slider
        value={[value]}
        min={constraints.min}
        max={constraints.max}
        step={0.1}
        onValueChange={(values) => onChange(values[0])}
        className="my-2"
      />
    </div>
  );
}
