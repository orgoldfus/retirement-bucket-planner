import { Bucket, AssetAllocation, Asset, WithdrawalPlan, TimeFrame, PortfolioProjection } from '../types';
import { assets } from '../data/assets';

export const calculateBucketYield = (bucket: Bucket, timeFrame: TimeFrame): number => {
  let totalYield = 0;
  let totalPercentage = 0;
  
  bucket.allocation.forEach(allocation => {
    const asset = assets.find(a => a.id === allocation.assetId);
    if (asset) {
      totalYield += asset.historicalReturn[timeFrame] * allocation.percentage;
      totalPercentage += allocation.percentage;
    }
  });
  
  return totalPercentage > 0 ? totalYield / (totalPercentage / 100) : 0;
};

export const calculatePortfolioYield = (buckets: Bucket[], totalCapital: number, timeFrame: TimeFrame): number => {
  let weightedYield = 0;
  
  buckets.forEach(bucket => {
    const bucketYield = calculateBucketYield(bucket, timeFrame);
    weightedYield += bucketYield * (bucket.percentage / 100);
  });
  
  return weightedYield;
};

export const generateInitialBuckets = (): Bucket[] => {
  return [
    {
      id: 'short-term',
      name: 'Short-term',
      timeHorizon: 2,
      allocation: [],
      expectedYield: 0,
      percentage: 20
    },
    {
      id: 'mid-term',
      name: 'Mid-term',
      timeHorizon: 5,
      allocation: [],
      expectedYield: 0,
      percentage: 30
    },
    {
      id: 'long-term',
      name: 'Long-term',
      timeHorizon: 10,
      allocation: [],
      expectedYield: 0,
      percentage: 50
    }
  ];
};

export const projectPortfolio = (
  totalCapital: number, 
  buckets: Bucket[], 
  withdrawalPlan: WithdrawalPlan, 
  timeFrame: TimeFrame,
  years: number = 30
): PortfolioProjection[] => {
  const projections: PortfolioProjection[] = [];
  let portfolioValue = totalCapital;
  let currentWithdrawal = withdrawalPlan.annualAmount;
  
  for (let year = 0; year <= years; year++) {
    if (portfolioValue <= 0) break;
    
    const returns = portfolioValue * (calculatePortfolioYield(buckets, totalCapital, timeFrame) / 100);
    
    portfolioValue = portfolioValue + returns - currentWithdrawal;
    
    projections.push({
      year,
      portfolioValue: Math.max(0, portfolioValue),
      withdrawal: currentWithdrawal,
      returns
    });
    
    if (withdrawalPlan.adjustForInflation) {
      currentWithdrawal *= (1 + withdrawalPlan.inflationRate / 100);
    }
  }
  
  return projections;
};

export const estimatePortfolioLongevity = (projections: PortfolioProjection[]): number => {
  const lastPositiveIndex = projections.findIndex(p => p.portfolioValue <= 0);
  return lastPositiveIndex === -1 ? projections.length - 1 : lastPositiveIndex - 1;
};

export const formatCurrency = (amount: number, currencySymbol: string): string => {
  return `${currencySymbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};