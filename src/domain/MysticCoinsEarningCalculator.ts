import { MysticCoinData } from './MysticCoinData';
import { Currency } from './Currency';
import { Reward } from './Reward';
import { EarningsCalculator } from './EarningsCalculator';
import { MaterialPricer } from './MaterialPricer';

export class MysticCoinsEarningCalculator implements EarningsCalculator {
  constructor(
    private readonly materialPricer: MaterialPricer,
    private readonly mysticCoinData: MysticCoinData
  ) {}

  async getEarnings(): Promise<Reward> {
    const price = await this.materialPricer.getPrices([this.mysticCoinData.id]);
    return new Reward(
      this.mysticCoinData.name,
      this.mysticCoinData.amount,
      new Currency(price[this.mysticCoinData.id])
    );
  }
}
