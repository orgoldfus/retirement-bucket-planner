import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 mb-6">
      <div className="bg-neutral-900 text-white p-4 border-3 border-black shadow-brutal font-brutal">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="font-bold text-lg mb-2">Retirement Bucket Planner</h3>
            <p className="text-sm text-neutral-300">
              A planning tool to help allocate retirement savings across time buckets
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p className="text-sm text-neutral-300">
              © 2025 Retirement Bucket Planner
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              Historical data is for illustrative purposes only. Past performance is not indicative of future results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;