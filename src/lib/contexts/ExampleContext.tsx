import { useContext, createContext, useState, useEffect } from 'react';

import type { IContextProvider } from '../interfaces/Provider';

export const ExampleContext = createContext({});

export default function AppProvider({ children }: IContextProvider) {
  return (
    <ExampleContext.Provider value={{}}>{children}</ExampleContext.Provider>
  );
}

export function useExampleContext(): any {
  return useContext(ExampleContext);
}
