import React, { useEffect, useState } from 'react';
import { GW2ApiService } from './services/GW2ApiService';
import { Reward } from './domain/Reward';
import { Container } from 'react-bootstrap';
import { LaurelEarningsCalculator } from './domain/LaurelEarningsCalculator';
import { MysticCoinsEarningCalculator } from './domain/MysticCoinsEarningCalculator';
import { MonthlyEarningsCalculator } from './domain/MonthlyEarningsCalculator';
import { LaurelReturnInfo } from './domain/LaurelReturnInfo';

import craftingBagData from './data/CraftingMaterialData.json';
import mysticCoinData from './data/MysticCoinData.json';
import { AccountEarnings } from './components/AccountEarnings/AccountEarnings';
import { LaurelEarnings } from './components/LaurelEarnings';
import { MaterialEarningsInfo } from './domain/MaterialEarningsInfo';
import { MaterialPricer } from './domain/MaterialPricer';

function App() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [laurelInfo, setLaurelInfo] = useState<LaurelReturnInfo[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const apiService = new GW2ApiService();

    const updateStateWithAsyncData = async () => {
      const materialPricer = new MaterialPricer(apiService, 0.15);
      const materialEarningsInfo = new MaterialEarningsInfo(
        materialPricer,
        craftingBagData
      );
      const laurelCalculator = new LaurelEarningsCalculator(
        materialEarningsInfo,
        55
      );
      const mysticCoinCalculator = new MysticCoinsEarningCalculator(
        materialPricer,
        mysticCoinData
      );
      const monthlyEarningsCalculator = new MonthlyEarningsCalculator([
        laurelCalculator,
        mysticCoinCalculator,
      ]);
      const rewardsToFill = await monthlyEarningsCalculator.getEarnings();

      setTotal(
        rewardsToFill
          .map((r) => r.totalValue().value)
          .reduce((total, v) => total + v)
      );
      setLaurelInfo(await materialEarningsInfo.getEarningsInfo());
      setRewards(rewardsToFill);
    };

    updateStateWithAsyncData();
  }, [setRewards, setLaurelInfo, setTotal]);

  return (
    <Container className="p-3" fluid>
      <AccountEarnings rewards={rewards} total={total} />
      <LaurelEarnings laurelInfo={laurelInfo} />
    </Container>
  );
}

export default App;
