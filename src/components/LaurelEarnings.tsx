import React from 'react';
import { Table } from 'react-bootstrap';
import { Currency } from '../domain/Currency';
import { LaurelReturnInfo } from '../domain/LaurelReturnInfo';
import { GoldDisplay } from './common/GoldDisplay';

interface Props {
  laurelInfo: LaurelReturnInfo[]
}

export const LaurelEarnings = ({ laurelInfo }: Props) => {
  return (
    <>
      <h2>Laurels</h2>
      <Table bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Material Type</th>
            <th>Value Per Laurel</th>
          </tr>
        </thead>
        <tbody>
          {laurelInfo.map((info) => (
            <tr>
              <td>{info.label}</td>
              <td>
                <GoldDisplay currency={new Currency(info.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
