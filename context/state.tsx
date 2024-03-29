import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import audit from "../api/audit";
import Toast from "../components/Common/Toast/Toast";
import homeApi from "../api/profileHome/getHomeProfile";

interface SelectedFilterType {
  server: string;
  character: string[];
  weapon: string[];
  ar: string;
  code: string;
  rangePrice: number[];
  orderPrice: number | null;
}

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [openDashboard, setOpenDashboard] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [messageToast, setMessageToast] = useState<string>("");
  const [role, setRole] = useState<string>("unLoad");
  const [username, setUsername] = useState<string>("");

  const [update, setUpdate] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<SelectedFilterType>({
    server: "",
    character: [],
    weapon: [],
    ar: "",
    code: "",
    rangePrice: [],
    orderPrice: null,
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
  const refreshLogin = async () => {
    setIsLogin(false);
    const res = await homeApi.getProfile();
    if (res) {
      setRole(res.data.role);
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
    const fetch = async () => {
      const res = await homeApi.getProfile();
      const wishList = localStorage.getItem("wishList");

      if (!Boolean(wishList))
        localStorage.setItem("wishList", JSON.stringify([]));

      if (!isJsonString(wishList))
        localStorage.setItem("wishList", JSON.stringify([]));

      if (res) {
        try {
          setRole(res.data.role);
          setUsername(res.data.username ?? "");
        } catch (error) {
          localStorage.removeItem("access_token");
        }
        setIsLogin(true);
      }
    };

    fetch();
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
    username,
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
