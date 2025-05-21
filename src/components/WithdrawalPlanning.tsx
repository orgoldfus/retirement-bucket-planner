import React, { useState } from "react";
import { Bucket, Currency, TimeFrame, WithdrawalPlan } from "../types";
import {
  estimatePortfolioLongevity,
  formatCurrency,
  projectPortfolio,
} from "../utils/calculations";
import NeoBrutalBox from "./NeoBrutalBox";
import NeoBrutalInput from "./NeoBrutalInput";
import PortfolioChart from "./PortfolioChart";

interface WithdrawalPlanningProps {
  totalCapital: number;
  buckets: Bucket[];
  withdrawalPlan: WithdrawalPlan;
  setWithdrawalPlan: (plan: WithdrawalPlan) => void;
  selectedCurrency: Currency;
  selectedTimeFrame: TimeFrame;
}

const WithdrawalPlanning: React.FC<WithdrawalPlanningProps> = ({
  totalCapital,
  buckets,
  withdrawalPlan,
  setWithdrawalPlan,
  selectedCurrency,
  selectedTimeFrame,
}) => {
  const [expanded, setExpanded] = useState(false);

  const updateWithdrawalPlan = (
    field: keyof WithdrawalPlan,
    value: number | boolean
  ) => {
    setWithdrawalPlan({
      ...withdrawalPlan,
      [field]: value,
    });
  };

  const projections = projectPortfolio(
    totalCapital,
    buckets,
    withdrawalPlan,
    selectedTimeFrame
  );

  const portfolioLongevity = estimatePortfolioLongevity(projections);
  const lastProjectionYear = projections.length - 1;

  const yearsToDisplay = expanded ? projections.length : 10;

  const chartData = projections.map((projection) => ({
    year: projection.year,
    portfolioValue: projection.portfolioValue,
    withdrawal: projection.withdrawal,
    returns: projection.returns,
  }));

  return (
    <NeoBrutalBox title="Withdrawal Planning" className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-2/3">
          <NeoBrutalInput
            label="Annual Withdrawal Amount"
            value={withdrawalPlan.annualAmount}
            onChange={(e) =>
              updateWithdrawalPlan("annualAmount", Number(e.target.value) || 0)
            }
            type="number"
            min={0}
            step={1000}
            prefix={selectedCurrency.symbol}
            required
          />
        </div>
        <div className="w-full md:w-1/3">
          <div className="mb-2">
            <label className="block font-brutal font-bold mb-2 text-neutral-900">
              Adjust for Inflation
            </label>
            <div className="flex items-center">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={withdrawalPlan.adjustForInflation}
                  onChange={(e) =>
                    updateWithdrawalPlan("adjustForInflation", e.target.checked)
                  }
                  className="
                    form-checkbox w-5 h-5
                    border-3 border-black
                    text-primary-500
                    focus:ring-0 focus:outline-none
                  "
                />
                <span className="ml-2 font-brutal">
                  Enable inflation adjustment
                </span>
              </label>
            </div>
          </div>
          {withdrawalPlan.adjustForInflation && (
            <NeoBrutalInput
              label="Annual Inflation Rate (%)"
              value={withdrawalPlan.inflationRate}
              onChange={(e) =>
                updateWithdrawalPlan(
                  "inflationRate",
                  Number(e.target.value) || 0
                )
              }
              type="number"
              min={0}
              max={20}
              step={0.1}
              suffix="%"
            />
          )}
        </div>
      </div>

      <div className="bg-white border-3 border-black p-4 mb-4">
        <h3 className="font-brutal font-bold mb-4">
          Portfolio Longevity Projection
        </h3>

        <div className="flex justify-between items-center mb-2">
          <span className="font-brutal">Estimated Portfolio Duration:</span>
          <span
            className={`font-brutal font-bold text-lg ${
              portfolioLongevity < 20
                ? "text-error-500"
                : portfolioLongevity < 30
                ? "text-warning-500"
                : "text-success-500"
            }`}
          >
            {portfolioLongevity === lastProjectionYear
              ? "30+ years"
              : `${portfolioLongevity} years`}
          </span>
        </div>

        <div className="w-full h-8 bg-neutral-200 border-3 border-black mb-4 overflow-hidden">
          <div
            className={`h-full ${
              portfolioLongevity < 20
                ? "bg-error-500"
                : portfolioLongevity < 30
                ? "bg-warning-500"
                : "bg-success-500"
            }`}
            style={{ width: `${(portfolioLongevity / 30) * 100}%` }}
          ></div>
        </div>

        <div className="overflow-auto">
          <table className="w-full border-collapse font-brutal">
            <thead>
              <tr className="bg-neutral-900 text-white border-3 border-black">
                <th className="p-2 text-left">Year</th>
                <th className="p-2 text-right">Portfolio Value</th>
                <th className="p-2 text-right">Annual Withdrawal</th>
                <th className="p-2 text-right">Returns</th>
              </tr>
            </thead>
            <tbody>
              {projections.slice(0, yearsToDisplay).map((projection) => (
                <tr
                  key={projection.year}
                  className={`
                    border-3 border-black
                    ${
                      projection.portfolioValue <= 0
                        ? "bg-error-100"
                        : "odd:bg-white even:bg-neutral-100"
                    }
                  `}
                >
                  <td className="p-2 font-bold">{projection.year}</td>
                  <td className="p-2 text-right">
                    {formatCurrency(
                      projection.portfolioValue,
                      selectedCurrency.symbol
                    )}
                  </td>
                  <td className="p-2 text-right">
                    {formatCurrency(
                      projection.withdrawal,
                      selectedCurrency.symbol
                    )}
                  </td>
                  <td className="p-2 text-right">
                    {formatCurrency(
                      projection.returns,
                      selectedCurrency.symbol
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {expanded && (
          <PortfolioChart data={chartData} currency={selectedCurrency} />
        )}

        {!expanded && projections.length > 10 && (
          <div className="mt-2 text-center font-brutal text-sm text-neutral-600">
            Showing first 10 years of projection. Full data available in export.
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-block px-4 py-2 bg-white border-3 border-black font-brutal shadow-neobrutalism hover:shadow-neobrutalism-sm active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>

      <div className="p-4 bg-primary-100 border-l-6 border-primary-500">
        <h3 className="font-brutal font-bold mb-2">Withdrawal Strategy</h3>
        <p className="font-brutal text-sm">
          Your planned annual withdrawal of{" "}
          {formatCurrency(withdrawalPlan.annualAmount, selectedCurrency.symbol)}
          {withdrawalPlan.adjustForInflation
            ? ` (adjusted for inflation at ${withdrawalPlan.inflationRate}% per year)`
            : ""}
          is projected to last{" "}
          {portfolioLongevity === lastProjectionYear
            ? "30+ years"
            : `approximately ${portfolioLongevity} years`}
          .
          {portfolioLongevity < 20 &&
            " Consider reducing your withdrawal amount or adjusting your asset allocation for longevity."}
        </p>
      </div>
    </NeoBrutalBox>
  );
};

export default WithdrawalPlanning;
