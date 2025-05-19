import React from "react";
import { Currency } from "../types";
import { formatCurrency } from "../utils/calculations";
import NeoBrutalBox from "./NeoBrutalBox";
import NeoBrutalInput from "./NeoBrutalInput";

interface TotalCapitalInputProps {
  totalCapital: number;
  setTotalCapital: (value: number) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencies: Currency[];
}

const TotalCapitalInput: React.FC<TotalCapitalInputProps> = ({
  totalCapital,
  setTotalCapital,
  selectedCurrency,
  setSelectedCurrency,
  currencies,
}) => {
  return (
    <NeoBrutalBox title="Total Retirement Capital" className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <NeoBrutalInput
            label="Total Savings Amount"
            value={totalCapital}
            onChange={(e) => setTotalCapital(Number(e.target.value) || 0)}
            type="number"
            min={0}
            step={1000}
            prefix={selectedCurrency.symbol}
            required
          />
        </div>
        <div className="w-full md:w-1/3">
          <label className="block font-brutal font-bold mb-2 text-neutral-900">
            Currency
          </label>
          <div className="relative">
            <select
              value={selectedCurrency.code}
              onChange={(e) => {
                const currency = currencies.find(
                  (c) => c.code === e.target.value
                );
                if (currency) setSelectedCurrency(currency);
              }}
              className="
                appearance-none w-full px-4 py-2 pr-8
                bg-white 
                font-brutal 
                border-3 border-black 
                shadow-brutal 
                focus:outline-none focus:ring-0 
                focus:border-primary-500 
                focus:shadow-none focus:translate-x-1 focus:translate-y-1
              "
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-neutral-700 font-brutal">
        You have {formatCurrency(totalCapital, selectedCurrency.symbol)} in
        total retirement savings.
      </p>
    </NeoBrutalBox>
  );
};

export default TotalCapitalInput;
