'use client';

import React, { useState, type PropsWithChildren } from 'react';
import { SendTransactionContextProvider, type SendTractionValue } from '@/context/sendTransaction.context';

const Layout = ({ children }: PropsWithChildren) => {
  const [sendTransactionValue, setSendTransaction] = useState<SendTractionValue | undefined>(undefined);

  const handleSendTransaction = (value: Partial<SendTractionValue>) => {
    setSendTransaction({
      ...sendTransactionValue,
      ...value,
    } as SendTractionValue);
  };

  return (
    <SendTransactionContextProvider value={{ onSendTransaction: handleSendTransaction, sendTransactionValue }}>
      {children}
    </SendTransactionContextProvider>
  );
};

export default Layout;
