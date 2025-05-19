import { Asset } from '../types';

export const assets: Asset[] = [
  {
    id: 'sp500',
    name: 'S&P 500',
    type: 'international',
    description: 'Index of 500 leading U.S. publicly traded companies',
    historicalReturn: {
      oneYear: 0.15,
      fiveYear: 0.11,
      tenYear: 0.12,
      twentyYear: 0.09,
      thirtyYear: 0.10
    }
  },
  {
    id: 'nasdaq',
    name: 'NASDAQ Composite',
    type: 'international',
    description: 'Index of all stocks listed on the Nasdaq stock market',
    historicalReturn: {
      oneYear: 0.20,
      fiveYear: 0.16,
      tenYear: 0.15,
      twentyYear: 0.10,
      thirtyYear: 0.11
    }
  },
  {
    id: 'msci-world',
    name: 'MSCI World',
    type: 'international',
    description: 'Index of global developed market companies',
    historicalReturn: {
      oneYear: 0.12,
      fiveYear: 0.09,
      tenYear: 0.10,
      twentyYear: 0.08,
      thirtyYear: 0.08
    }
  },
  {
    id: 'msci-em',
    name: 'MSCI Emerging Markets',
    type: 'international',
    description: 'Index of emerging market countries',
    historicalReturn: {
      oneYear: 0.10,
      fiveYear: 0.07,
      tenYear: 0.06,
      twentyYear: 0.08,
      thirtyYear: 0.09
    }
  },
  {
    id: 'ta-35',
    name: 'TA-35',
    type: 'israeli',
    description: 'Index of 35 largest companies on the Tel Aviv Stock Exchange',
    historicalReturn: {
      oneYear: 0.13,
      fiveYear: 0.09,
      tenYear: 0.08,
      twentyYear: 0.07,
      thirtyYear: 0.09
    }
  },
  {
    id: 'ta-90',
    name: 'TA-90',
    type: 'israeli',
    description: 'Index of mid-cap companies on the Tel Aviv Stock Exchange',
    historicalReturn: {
      oneYear: 0.14,
      fiveYear: 0.10,
      tenYear: 0.09,
      twentyYear: 0.08,
      thirtyYear: 0.09
    }
  },
  {
    id: 'tel-bond-20',
    name: 'Tel-Bond 20',
    type: 'israeli',
    description: 'Index of 20 corporate bonds on the Tel Aviv Stock Exchange',
    historicalReturn: {
      oneYear: 0.05,
      fiveYear: 0.04,
      tenYear: 0.05,
      twentyYear: 0.05,
      thirtyYear: 0.06
    }
  },
  {
    id: 'global-bonds',
    name: 'Global Bonds',
    type: 'international',
    description: 'Index of global government and corporate bonds',
    historicalReturn: {
      oneYear: 0.03,
      fiveYear: 0.03,
      tenYear: 0.04,
      twentyYear: 0.04,
      thirtyYear: 0.05
    }
  }
];