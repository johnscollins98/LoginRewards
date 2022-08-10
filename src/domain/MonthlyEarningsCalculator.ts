import { EarningsCalculator } from './EarningsCalculator';
import { Reward } from './Reward';

export class MonthlyEarningsCalculator {
  constructor(private readonly calculators: EarningsCalculator[]) {}

  async getEarnings(): Promise<Reward[]> {
    return await Promise.all(this.calculators.map((c) => c.getEarnings()));
  }
}
