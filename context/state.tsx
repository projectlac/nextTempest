import { createContext, useContext, useEffect, useState } from "react";
import Toast from "../components/Common/Toast/Toast";
import jwt_decode from "jwt-decode";

interface SelectedFilterType {
  server: string;
  character: string[];
  weapon: string[];
}

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [openDashboard, setOpenDashboard] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [messageToast, setMessageToast] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilterType>({
    server: "",
    character: [],
    weapon: [],
  });

  const handleSelectedFilter = (data: SelectedFilterType) => {
    setSelectedFilter(data);
  };
  const updated = () => {
    const newState = !update;
    setUpdate(newState);
  };
  const handleLoginTrue = () => {
    setIsLogin(true);
  };
  const refreshLogin = () => {
    setIsLogin(false);
    const token = localStorage.getItem("access_token");

    if (Boolean(token)) {
      setRole(jwt_decode<any>(token).role);
    }
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

  const isJsonString = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const wishList = localStorage.getItem("wishList");

    if (!Boolean(wishList))
      localStorage.setItem("wishList", JSON.stringify([]));

    if (!isJsonString(wishList))
      localStorage.setItem("wishList", JSON.stringify([]));

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
    updated,
    update,
    handleSelectedFilter,
    selectedFilter,
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
