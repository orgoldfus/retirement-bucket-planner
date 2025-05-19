import { PiggyBankIcon } from "lucide-react";
import React from "react";
import { TimeFrame } from "../types";

interface HeaderProps {
  selectedTimeFrame: TimeFrame;
  setSelectedTimeFrame: (timeFrame: TimeFrame) => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedTimeFrame,
  setSelectedTimeFrame,
}) => {
  return (
    <header className="mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between bg-primary-500 p-4 border-3 border-black shadow-brutal mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white p-2 border-3 border-black shadow-brutal mr-4">
            <PiggyBankIcon size={32} className="text-primary-500" />
          </div>
          <h1 className="text-3xl font-brutal font-bold text-white">
            Retirement Bucket Planner
          </h1>
        </div>
        <div className="w-full md:w-auto">
          <div className="font-brutal font-bold text-white mb-1">
            Historical Data Timeframe:
          </div>
          <div className="flex justify-center md:justify-start flex-wrap">
            <TimeFrameButton
              label="1Y"
              timeFrame="oneYear"
              current={selectedTimeFrame}
              onClick={setSelectedTimeFrame}
            />
            <TimeFrameButton
              label="5Y"
              timeFrame="fiveYear"
              current={selectedTimeFrame}
              onClick={setSelectedTimeFrame}
            />
            <TimeFrameButton
              label="10Y"
              timeFrame="tenYear"
              current={selectedTimeFrame}
              onClick={setSelectedTimeFrame}
            />
            <TimeFrameButton
              label="20Y"
              timeFrame="twentyYear"
              current={selectedTimeFrame}
              onClick={setSelectedTimeFrame}
            />
            <TimeFrameButton
              label="30Y"
              timeFrame="thirtyYear"
              current={selectedTimeFrame}
              onClick={setSelectedTimeFrame}
            />
          </div>
        </div>
      </div>
      <div className="p-4 bg-white border-3 border-black shadow-brutal font-brutal">
        <p>
          Plan your retirement savings by configuring time-based buckets,
          allocating assets, and simulating withdrawals.
        </p>
      </div>
    </header>
  );
};

interface TimeFrameButtonProps {
  label: string;
  timeFrame: TimeFrame;
  current: TimeFrame;
  onClick: (timeFrame: TimeFrame) => void;
}

const TimeFrameButton: React.FC<TimeFrameButtonProps> = ({
  label,
  timeFrame,
  current,
  onClick,
}) => {
  const isActive = timeFrame === current;

  return (
    <button
      onClick={() => onClick(timeFrame)}
      className={`
        font-brutal font-bold px-3 py-1 mr-2 mb-2
        border-3 border-black
        ${
          isActive
            ? "bg-accent-500 text-black shadow-none translate-x-1 translate-y-1"
            : "bg-white text-black shadow-brutal"
        }
        transition-transform active:translate-y-1 active:translate-x-1 active:shadow-none
      `}
    >
      {label}
    </button>
  );
};

export default Header;
