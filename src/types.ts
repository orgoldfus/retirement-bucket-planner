export interface Asset {
  id: string;
  name: string;
  type: "international" | "israeli" | "custom";
  description: string;
  historicalReturn: {
    oneYear: number;
    fiveYear: number;
    tenYear: number;
    twentyYear: number;
    thirtyYear: number;
  };
}

export interface Bucket {
  id: string;
  name: string;
  timeHorizon: number; // in years
  allocation: AssetAllocation[];
  expectedYield: number;
  percentage: number; // Percentage of total capital
}

export interface AssetAllocation {
  assetId: string;
  percentage: number;
}

export type TimeFrame =
  | "oneYear"
  | "fiveYear"
  | "tenYear"
  | "twentyYear"
  | "thirtyYear";

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface WithdrawalPlan {
  annualAmount: number;
  adjustForInflation: boolean;
  inflationRate: number;
}

export interface PortfolioProjection {
  year: number;
  portfolioValue: number;
  withdrawal: number;
  returns: number;
}

export interface CustomAsset {
  name: string;
  historicalReturn: number;
}
