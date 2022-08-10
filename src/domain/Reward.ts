import { Currency } from './Currency';

export class Reward {
  readonly name: string;
  readonly amount: number;
  readonly value: Currency;

  constructor(name: string, amount: number, value: Currency) {
    this.name = name;
    this.amount = amount;
    this.value = value;
  }

  totalValue() : Currency {
    return new Currency(this.value.value * this.amount);
  }
}