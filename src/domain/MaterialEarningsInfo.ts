import { CraftingBagData } from './CraftingBagData';
import { LaurelReturnInfo } from './LaurelReturnInfo';
import { MaterialPricer } from './MaterialPricer';

export class MaterialEarningsInfo {
  constructor(
    private readonly materialPricer: MaterialPricer,
    private readonly craftingBagData: { [key: string]: CraftingBagData }
  ) {}

  async getEarningsInfo(): Promise<LaurelReturnInfo[]> {
    const allIds = Object.values(this.craftingBagData)
      .map((d) => d.possibleIds)
      .reduce((allIds, thisIds) => [...allIds, ...thisIds]);

    const materialPrices = await this.materialPricer.getPrices(allIds);

    return Object.entries(this.craftingBagData).map(([key, val]) => {
      const averageItemCount = (val.perChance.max + val.perChance.min) / 2;
      const averagePrice =
        val.possibleIds
          .map((id) => materialPrices[id])
          .reduce((total, thisVal) => total + thisVal) / val.possibleIds.length;
      const value = val.chances * averagePrice * averageItemCount;

      return { label: key, value };
    });
  }
}
