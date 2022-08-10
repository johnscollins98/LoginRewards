export interface CraftingBagData {
  chances: number;
  perChance: {
    min: number;
    max: number;
  },
  possibleIds: number[];
}