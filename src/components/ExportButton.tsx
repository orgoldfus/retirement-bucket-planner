import React from 'react';
import NeoBrutalButton from './NeoBrutalButton';
import { Bucket, Currency, WithdrawalPlan, TimeFrame, PortfolioProjection } from '../types';
import { projectPortfolio, calculateBucketYield, calculatePortfolioYield } from '../utils/calculations';
import { assets } from '../data/assets';
import { DownloadIcon } from 'lucide-react';

interface ExportButtonProps {
  totalCapital: number;
  buckets: Bucket[];
  withdrawalPlan: WithdrawalPlan;
  selectedCurrency: Currency;
  selectedTimeFrame: TimeFrame;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  totalCapital,
  buckets,
  withdrawalPlan,
  selectedCurrency,
  selectedTimeFrame
}) => {
  const handleExport = () => {
    // Generate projections
    const projections = projectPortfolio(
      totalCapital,
      buckets,
      withdrawalPlan,
      selectedTimeFrame,
      30
    );
    
    // Prepare CSV data
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add header
    csvContent += "Retirement Bucket Planner - Exported Plan\n\n";
    
    // Add basic info
    csvContent += "PLAN SUMMARY\n";
    csvContent += `Total Capital,${totalCapital},${selectedCurrency.code}\n`;
    csvContent += `Annual Withdrawal,${withdrawalPlan.annualAmount},${selectedCurrency.code}\n`;
    csvContent += `Inflation Adjustment,${withdrawalPlan.adjustForInflation ? 'Yes' : 'No'}\n`;
    if (withdrawalPlan.adjustForInflation) {
      csvContent += `Inflation Rate,${withdrawalPlan.inflationRate}%\n`;
    }
    csvContent += `Time Frame,${selectedTimeFrame === 'oneYear' ? '1 year' : 
      selectedTimeFrame === 'fiveYear' ? '5 year' : 
      selectedTimeFrame === 'tenYear' ? '10 year' : 
      selectedTimeFrame === 'twentyYear' ? '20 year' : '30 year'} historical data\n`;
    csvContent += `Expected Portfolio Yield,${(calculatePortfolioYield(buckets, totalCapital, selectedTimeFrame) * 100).toFixed(2)}%\n\n`;
    
    // Add bucket information
    csvContent += "BUCKET ALLOCATIONS\n";
    buckets.forEach(bucket => {
      csvContent += `\n${bucket.name} (${bucket.timeHorizon} years)\n`;
      csvContent += "Asset,Allocation (%),Expected Return (%)\n";
      
      bucket.allocation.forEach(allocation => {
        const asset = assets.find(a => a.id === allocation.assetId);
        if (asset) {
          csvContent += `${asset.name},${allocation.percentage}%,${(asset.historicalReturn[selectedTimeFrame] * 100).toFixed(2)}%\n`;
        }
      });
      
      csvContent += `Total Expected Return,${(calculateBucketYield(bucket, selectedTimeFrame) * 100).toFixed(2)}%\n`;
    });
    
    // Add portfolio projections
    csvContent += "\nPORTFOLIO PROJECTIONS\n";
    csvContent += "Year,Portfolio Value,Annual Withdrawal,Returns\n";
    
    projections.forEach(projection => {
      csvContent += `${projection.year},${projection.portfolioValue.toFixed(2)},${projection.withdrawal.toFixed(2)},${projection.returns.toFixed(2)}\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "retirement_plan.csv");
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  };
  
  return (
    <NeoBrutalButton 
      onClick={handleExport} 
      variant="accent"
      size="lg"
      className="w-full flex items-center justify-center"
    >
      <DownloadIcon className="mr-2 h-5 w-5" />
      Export Retirement Plan (CSV)
    </NeoBrutalButton>
  );
};

export default ExportButton;