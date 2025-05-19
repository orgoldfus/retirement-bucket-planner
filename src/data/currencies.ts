import { Currency } from '../types';

export const currencies: Currency[] = [
  {
    code: 'ILS',
    symbol: '₪',
    name: 'Israeli Shekel'
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar'
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro'
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound'
  }
];

export const defaultCurrency = currencies[0];