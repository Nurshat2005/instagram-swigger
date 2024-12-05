'use client';
import { api } from '@/redux/api';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { FC, ReactNode } from 'react';
interface IReduxProviders {
  children: ReactNode;
}

const ReduxProviders: FC<IReduxProviders> = ({ children }) => {
  return <ApiProvider api={api}>{children}</ApiProvider>;
};

export default ReduxProviders;
