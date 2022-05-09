import { createContext, useContext, useEffect, useState } from "react";
import Toast from "../components/Common/Toast/Toast";
import jwt_decode from "jwt-decode";

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [openDashboard, setOpenDashboard] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [messageToast, setMessageToast] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleLoginTrue = () => {
    setIsLogin(true);
  };
  const refreshLogin = () => {
    setIsLogin(false);
  };
  const handleCloseToast = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };
  const handleChangeStatusToast = () => {
    setOpenToast(true);
    setTimeout(() => {
      setOpenToast(false);
    }, 3000);
  };
  const handleChangeMessageToast = (msg: string) => {
    setMessageToast(msg);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (Boolean(token)) {
      setRole(jwt_decode<any>(token).role);
      setIsLogin(true);
    }
  }, []);

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
    handleChangeStatusToast,
    handleChangeMessageToast,
    openToast,
    messageToast,
    handleCloseToast,
    refreshLogin,
    role,
    /* whatever you want */
  };

  return (
    <AppContext.Provider value={sharedState}>
      <Toast
        openToast={openToast}
        messageToast={messageToast}
        handleCloseToast={handleCloseToast}
      />
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
