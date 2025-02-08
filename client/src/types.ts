export interface MetalComposition {
  copper: number;
  zinc: number;
  nickel: number;
  [key: string]: number; // This allows string indexing while maintaining specific properties
}
