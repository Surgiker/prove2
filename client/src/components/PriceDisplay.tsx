import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface PriceDisplayProps {
  composition: {
    copper: number;
    zinc: number;
    nickel: number;
  };
  prices: {
    copper: number;
    zinc: number;
    nickel: number;
  };
}

export default function PriceDisplay({ composition, prices }: PriceDisplayProps) {
  const calculateTotalPrice = () => {
    return Object.entries(composition).reduce((total, [metal, percentage]) => {
      return total + (prices[metal] * percentage / 100);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Prezzi metalli (€/kg)</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-6">
          {Object.entries(prices).map(([metal, price]) => (
            <div key={metal} className="flex justify-between">
              <span className="capitalize">{metal}:</span>
              <span>{formatPrice(price)} €/kg</span>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Costo lega:</span>
            <span className="text-xl font-bold">
              {formatPrice(calculateTotalPrice())} €/kg
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
