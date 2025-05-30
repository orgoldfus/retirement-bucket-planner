import { Asset } from "../types";

export const assets: Asset[] = [
  {
    id: "sp500",
    name: "S&P 500",
    type: "international",
    description: "Index of 500 leading U.S. publicly traded companies",
    historicalReturn: {
      oneYear: 0.23,
      fiveYear: 0.136,
      tenYear: 0.113,
      twentyYear: 0.084,
      thirtyYear: 0.09,
    },
  },
  {
    id: "nasdaq",
    name: "NASDAQ Composite",
    type: "international",
    description: "Index of all stocks listed on the Nasdaq stock market",
    historicalReturn: {
      oneYear: 0.1211,
      fiveYear: 0.154,
      tenYear: 0.1689,
      twentyYear: 0.165,
      thirtyYear: 0.12,
    },
  },
  {
    id: "msci-world",
    name: "MSCI World",
    type: "international",
    description: "Index of global developed market companies",
    historicalReturn: {
      oneYear: 0.1919,
      fiveYear: 0.1444,
      tenYear: 0.137,
      twentyYear: 0.09,
      thirtyYear: 0.095,
    },
  },
  {
    id: "msci-em",
    name: "MSCI Emerging Markets",
    type: "international",
    description: "Index of emerging market countries",
    historicalReturn: {
      oneYear: 0.05,
      fiveYear: 0.065,
      tenYear: 0.08,
      twentyYear: 0.07,
      thirtyYear: 0.09,
    },
  },
  {
    id: "ta-35",
    name: "TA-35",
    type: "israeli",
    description: "Index of 35 largest companies on the Tel Aviv Stock Exchange",
    historicalReturn: {
      oneYear: 0.22,
      fiveYear: 0.085,
      tenYear: 0.075,
      twentyYear: 0.065,
      thirtyYear: 0.08,
    },
  },
  {
    id: "ta-90",
    name: "TA-90",
    type: "israeli",
    description: "Index of mid-cap companies on the Tel Aviv Stock Exchange",
    historicalReturn: {
      oneYear: 0.24,
      fiveYear: 0.095,
      tenYear: 0.085,
      twentyYear: 0.07,
      thirtyYear: 0.08,
    },
  },
  {
    id: "tel-bond-20",
    name: "Tel-Bond 20",
    type: "israeli",
    description: "Index of 20 corporate bonds on the Tel Aviv Stock Exchange",
    historicalReturn: {
      oneYear: 0.04,
      fiveYear: 0.03,
      tenYear: 0.035,
      twentyYear: 0.04,
      thirtyYear: 0.05,
    },
  },
  {
    id: "global-bonds",
    name: "Global Bonds",
    type: "international",
    description: "Index of global government and corporate bonds",
    historicalReturn: {
      oneYear: 0.02,
      fiveYear: 0.03,
      tenYear: 0.035,
      twentyYear: 0.04,
      thirtyYear: 0.05,
    },
  },
];
