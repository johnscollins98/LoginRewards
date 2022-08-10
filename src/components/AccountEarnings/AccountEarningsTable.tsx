import React from 'react';
import { Table } from 'react-bootstrap';
import { Currency } from '../../domain/Currency';
import { Reward } from '../../domain/Reward';
import { GoldDisplay } from '../common/GoldDisplay';

interface Props {
  rewards: Reward[];
  numAccounts: number;
  total: number;
}

export const AccountEarningsTable = ({ rewards, numAccounts, total }: Props) => {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Item</th>
          <th>Number Acquired per Month per Account</th>
          <th>Value per Item</th>
          <th>Earnings per Account</th>
          <th>Total Earnings</th>
        </tr>
      </thead>
      <tbody>
        {rewards.map((reward) => (
          <tr>
            <td>{reward.name}</td>
            <td>{reward.amount}</td>
            <td>
              <GoldDisplay currency={reward.value} />
            </td>
            <td>
              <GoldDisplay currency={reward.totalValue()} />
            </td>
            <td>
              <GoldDisplay
                currency={new Currency(reward.totalValue().value * numAccounts)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>
            <b>Total</b>
          </td>
          <td>
            <GoldDisplay currency={new Currency(total)} />
          </td>
          <td>
            <GoldDisplay currency={new Currency(total * numAccounts)} />
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};
