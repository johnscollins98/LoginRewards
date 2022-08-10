import React from 'react';
import { Currency } from '../../domain/Currency';

import goldCoin from '../../images/Gold_coin.png';
import silverCoin from '../../images/Silver_coin.png';
import copperCoin from '../../images/Copper_coin.png';

export const GoldDisplay = ({ currency }: { currency: Currency }) => {
  return (
    <>
      {currency.goldValue.gold ? (
        <>
          {currency.goldValue.gold} <img src={goldCoin} alt="gold coin" />{' '}
        </>
      ) : null}
      {currency.goldValue.silver ? (
        <>
          {currency.goldValue.silver} <img src={silverCoin} alt="silver coin" />{' '}
        </>
      ) : null}
      {currency.goldValue.copper} <img src={copperCoin} alt="copper coin" />
    </>
  );
};