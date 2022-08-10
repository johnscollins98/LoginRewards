import { Reward } from '../domain/Reward';

export interface EarningsCalculator {
  getEarnings() : Promise<Reward>
}