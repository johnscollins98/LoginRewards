import React, { useCallback, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

interface Props {
  numAccounts: number;
  setNumAccounts: (numAccounts: number) => void;
  className?: string;
}

const isValid = (val: number) => {
  return val !== undefined && val >= 0;
};

export const NumAccountsForm = ({
  numAccounts,
  setNumAccounts,
  className,
}: Props) => {
  const [localNum, setLocalNum] = useState(numAccounts);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // only set actual num accounts if valid - always set local num
      // onBlur will reset local num to match numAccounts which will handle any invalid entry
      const asInt = parseInt(e.target.value);
      if (isValid(asInt)) {
        setNumAccounts(asInt);
      }
      setLocalNum(asInt);
    },
    [setNumAccounts, setLocalNum]
  );

  const onBlur = useCallback(() => {
    // reset local num on blur, just incase it was invalid
    setLocalNum(numAccounts);
  }, [numAccounts, setLocalNum]);

  return (
    <InputGroup className={className}>
      <InputGroup.Text id="basic-addon1">Number of Accounts</InputGroup.Text>
      <FormControl
        type="number"
        aria-label="Number of Accounts"
        value={localNum}
        onChange={onChange}
        onBlur={onBlur}
      />
    </InputGroup>
  );
};
