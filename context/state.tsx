import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [openDashboard, setOpenDashboard] = useState<boolean>(false);

  const handleLoginTrue = () => {
    setIsLogin(true);
  };

  useEffect(() => {
    if (isLogin) {
      setOpenDashboard(true);
    } else {
      setOpenDashboard(false);
    }
  }, [isLogin]);
  let sharedState = {
    handleLoginTrue,
    isLogin,
    openDashboard,
    /* whatever you want */
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
