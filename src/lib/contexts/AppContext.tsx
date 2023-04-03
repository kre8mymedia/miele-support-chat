import React, { useContext } from 'react';

import type { IContextProvider } from '../interfaces/Provider';

export const AppContext = React.createContext({});

export default function AppProvider({ children }: IContextProvider) {
  const [windowHeight, setWindowWidth] = React.useState<number>(1920);
  const [windowWidth, setWindowHeight] = React.useState<number>(1080);
  const [chartAspectHeight, setChartAspectHeight] = React.useState<number>(1.5);
  const [chartAspectWidth, setChartAspectWidth] = React.useState<number>(4);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [alert, setAlert] = React.useState<{
    status: boolean;
    severity: string;
    message: string;
  }>({
    status: false,
    severity: '',
    message: '',
  });

  const title = 'Open AI Code Generator';

  const clearAlert = () => {
    setAlert({
      status: false,
      severity: '',
      message: '',
    });
  };

  const cycleAlert = (newAlert: {
    status: boolean;
    severity: string;
    message: string;
  }) => {
    setAlert(newAlert);
    setTimeout(() => {
      clearAlert();
    }, 3000);
  };

  React.useEffect(() => {
    function findDimensions() {
      const windowWidthNew = window.innerWidth;
      const windowHeightNew = window.innerHeight;
      setWindowWidth(windowWidthNew);
      setWindowHeight(windowHeightNew);
      if (windowWidthNew < 600) {
        setChartAspectHeight(1.3);
        setChartAspectWidth(3);
      }
      if (windowWidthNew > 600) {
        setChartAspectHeight(0.8);
        setChartAspectWidth(5);
      }
    }

    setTimeout(() => {
      window.addEventListener('resize', findDimensions);
    }, 1000);
    findDimensions();
    return () => window.removeEventListener('resize', findDimensions);
  }, []);

  return (
    <AppContext.Provider
      value={{
        title,
        windowHeight,
        windowWidth,
        chartAspectWidth,
        chartAspectHeight,
        alert,
        setAlert,
        cycleAlert,
        open,
        setOpen,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): any {
  return useContext(AppContext);
}
