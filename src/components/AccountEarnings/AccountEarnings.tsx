import React, { useState } from 'react';
import { Reward } from '../../domain/Reward';
import { AccountEarningsTable } from './AccountEarningsTable';
import { NumAccountsForm } from './NumAccountsForm';

interface Props {
  rewards: Reward[];
  total: number;
}

export const AccountEarnings = ({ rewards, total }: Props) => {
  const [numAccounts, setNumAccounts] = useState(0);
  return (
    <>
      <h2>Account Earnings</h2>
      <NumAccountsForm
        numAccounts={numAccounts}
        setNumAccounts={setNumAccounts}
        className="mb-3"
      />
      <AccountEarningsTable
        rewards={rewards}
        numAccounts={numAccounts}
        total={total}
      />
    </>
  );
};
