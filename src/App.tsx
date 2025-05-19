import React, { useState } from 'react';
import { Bucket, Currency, WithdrawalPlan, TimeFrame } from './types';
import { assets } from './data/assets';
import { currencies, defaultCurrency } from './data/currencies';
import { generateInitialBuckets } from './utils/calculations';
import Header from './components/Header';
import TotalCapitalInput from './components/TotalCapitalInput';
import BucketConfiguration from './components/BucketConfiguration';
import AssetAllocation from './components/AssetAllocation';
import WithdrawalPlanning from './components/WithdrawalPlanning';
import ExportButton from './components/ExportButton';
import Footer from './components/Footer';

function App() {
  const [totalCapital, setTotalCapital] = useState<number>(1000000);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(defaultCurrency);
  const [buckets, setBuckets] = useState<Bucket[]>(generateInitialBuckets());
  const [withdrawalPlan, setWithdrawalPlan] = useState<WithdrawalPlan>({
    annualAmount: 40000,
    adjustForInflation: true,
    inflationRate: 2.5
  });
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('tenYear');

  return (
    <div className="min-h-screen bg-neutral-100 font-brutal">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <Header
          selectedTimeFrame={selectedTimeFrame}
          setSelectedTimeFrame={setSelectedTimeFrame}
        />
        
        <main>
          <TotalCapitalInput
            totalCapital={totalCapital}
            setTotalCapital={setTotalCapital}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            currencies={currencies}
          />
          
          <BucketConfiguration
            buckets={buckets}
            setBuckets={setBuckets}
            totalCapital={totalCapital}
          />
          
          <AssetAllocation
            buckets={buckets}
            setBuckets={setBuckets}
            assets={assets}
            selectedTimeFrame={selectedTimeFrame}
          />
          
          <WithdrawalPlanning
            totalCapital={totalCapital}
            buckets={buckets}
            withdrawalPlan={withdrawalPlan}
            setWithdrawalPlan={setWithdrawalPlan}
            selectedCurrency={selectedCurrency}
            selectedTimeFrame={selectedTimeFrame}
          />
          
          <div className="my-8">
            <ExportButton
              totalCapital={totalCapital}
              buckets={buckets}
              withdrawalPlan={withdrawalPlan}
              selectedCurrency={selectedCurrency}
              selectedTimeFrame={selectedTimeFrame}
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;