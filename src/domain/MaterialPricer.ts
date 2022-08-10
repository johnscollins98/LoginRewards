import { GW2ApiService } from '../services/GW2ApiService';

export class MaterialPricer {
  private readonly cache: { [key: number]: number };
  constructor(private readonly gw2Api: GW2ApiService, private readonly tax: number) {
    this.cache = {};
  }

  async getPrices(ids: number[]): Promise<{ [key: number]: number }> {
    if (Object.entries(this.cache).length === 0) {
      const apiData = await this.gw2Api.get('commerce/prices', {
        ids: ids.join(','),
      });
      
      for (const entry of apiData) {
        this.cache[entry['id']] = entry['sells']['unit_price'] * (1 - this.tax);
      }
    }

    return this.cache;
  }
}
