class GoldValue {
  readonly gold: number;
  readonly silver: number;
  readonly copper: number;

  constructor(value: number) {
    this.gold = Math.floor(value / 10000);
    this.silver = Math.floor((value / 100) % 100);
    this.copper = Math.floor(value % 100);
  }
}

export class Currency {
  readonly goldValue: GoldValue;

  constructor(readonly value: number) {
    this.goldValue = new GoldValue(value);
  }
}
