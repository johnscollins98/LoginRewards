import { Reward } from './Reward';
import { Currency } from './Currency';
import { EarningsCalculator } from './EarningsCalculator';
import { MaterialEarningsInfo } from './MaterialEarningsInfo';

export class LaurelEarningsCalculator implements EarningsCalculator {
  constructor(
    private readonly materialEarningsInfo: MaterialEarningsInfo,
    private readonly numberOfLaurels: number
  ) {}

  async getEarnings(): Promise<Reward> {
    const earningsInfo = await this.materialEarningsInfo.getEarningsInfo();
    const bestEarning = earningsInfo.reduce((a, b) => {
      if (a.value >= b.value) return a;
      return b;
    });

    return new Reward(bestEarning.label, this.numberOfLaurels, new Currency(bestEarning.value));
  }
}
