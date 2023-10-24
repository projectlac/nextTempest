import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import backgroundAT from "../../../styles/assets/images/payment/backgroundAT.png";
import backgroundBT from "../../../styles/assets/images/payment/buttonNormal.png";

import BGNews from "../../../styles/assets/images/newsDes/BGNews.png";
import BGNewsBottom from "../../../styles/assets/images/newsDes/BGNewsBottom.png";
import BGNewsTop from "../../../styles/assets/images/newsDes/BGNewsTop.png";

import Four from "./Tab/Four";
import One from "./Tab/One";
import Two from "./Tab/Two";
import Three from "./Tab/Three";
import Five from "./Tab/Five";
import { useRouter } from "next/router";
import _ from "lodash";

const DashboardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  left: "0",
  top: "0",
  bottom: "0",
  right: "0",
  zIndex: "1",
  justifyContent: "center",

  background: `url(${BGNews.src})`,
  marginLeft: "auto",
  marginRight: "auto",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  padding: "0 65px",
  position: "relative",
  "&:before": {
    position: "absolute",
    content: '""',
    background: `url(${BGNewsTop.src})`,
    height: "55px",
    width: "100%",
    top: "0",
    zIndex: 1,
    left: 0,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    "@media (min-width: 0)": {
      top: "-30px",
    },
    "@media (min-width: 768px)": {
      top: "0",
    },
  },
  "&:after": {
    position: "absolute",
    content: '""',
    background: `url(${BGNewsBottom.src})`,
    backgroundSize: "100%",
    height: "35px",
    width: "100%",
    bottom: "0",
    right: 0,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    "@media (max-width: 435px)": {
      bottom: "-20px",
    },
  },
  "@media (min-width: 0px)": {
    padding: "0 25px",
    backgroundSize: "contain",
    backgroundRepeat: "repeat",
    height: "auto",
    width: "100%",
    alignItems: "flex-start",
    marginBottom: "75px",
    paddingBottom: "40px",
  },
  "@media (min-width: 768px)": {
    padding: "0 25px",
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    height: "auto",
    width: "100%",
    alignItems: "flex-start",
    marginBottom: "75px",
    paddingBottom: "40px",
  },
  "@media (min-width: 1024px)": {
    padding: "0 65px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "720px",
    width: "auto",
    marginBottom: "0",
    alignItems: "center",
    paddingBottom: "0",
  },
  "@media (min-width: 1440px)": {
    padding: " 0 80px",
    width: "1170px",
  },
}));

const ListTab = styled(Box)({
  display: "flex",
  position: "absolute",
  top: "-43.5px",
  width: "100%",
  justifyContent: "flex-end",
  marginRight: "50px",
  "& > div": {
    background: `url(${backgroundBT.src})`,
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    color: "#A18A6F",
    marginLeft: "5px",
    transition: "all 0.1s linear",
    cursor: "pointer",
    "@media (min-width: 0)": {
      width: "33%",
      fontSize: "11px",
      height: "36px",
      paddingTop: "4px",
      backgroundSize: "100% 100%",
    },
    "@media (min-width: 768px)": {
      width: "33%",
      fontSize: "18px",
      height: "45px",
      paddingTop: "13px",
      backgroundSize: "cover",
    },
    "@media (min-width: 1024px)": {
      width: "242px",
      fontSize: "20px",
      height: "50px",
      paddingTop: "13px",
      backgroundSize: "cover",
    },

    "&.active": {
      background: `url(${backgroundAT.src})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      color: "#F1E8D3",
      height: "59px",
      marginTop: "-9px",
      paddingTop: "16px",
      fontSize: "22px",
      "@media (min-width: 0)": {
        width: "33%",
        fontSize: "11px",
        height: "42px",
        paddingTop: "5px",
        backgroundSize: "100% 100%",
      },
      "@media (min-width: 768px)": {
        width: "33%",
        fontSize: "19px",
        height: "60px",
        paddingTop: "13px",
        backgroundSize: "cover",
      },
      "@media (min-width: 1024px)": {
        width: "242px",
        fontSize: "20px",
        height: "60px",
        paddingTop: "13px",
        backgroundSize: "cover",
      },
    },
  },
  "@media (min-width: 0)": { top: "-53.5px", marginRight: "5px" },

  "@media (min-width: 768px)": { top: "-43.5px", marginRight: "5px" },
  "@media (min-width: 1024px)": {
    padding: "0 100px",
    top: "-48.5px",
    marginRight: "-166px",
  },
  "@media (min-width: 1400px)": {
    padding: "0 0",
    top: "-49.5px",
    marginRight: "50px",
  },
});
function Dashboard() {
  const router = useRouter();
  const [active, setActive] = useState<number>(1);
  const handleSetActive = (tab: number) => {
    setActive(tab);
  };

  useEffect(() => {
    const {
      query: { action },
    } = router;

    if (action === "card") handleSetActive(3);
    if (action === "user") handleSetActive(2);
    if (action === "history") handleSetActive(0);
  }, [router]);

  return (
    <DashboardWrapper
      sx={{
        mt: {
          md: 10,
          xs: 20,
        },
      }}
    >
      <ListTab>
        <Box
          className={`${active === 0 ? "active" : ""}`}
          onClick={() => {
            handleSetActive(0);
            router.push("/nap-tien?action=history");
          }}
        >
          Lịch sử mua
        </Box>
        <Box
          className={`${active === 1 ? "active" : ""}`}
          onClick={() => {
            handleSetActive(1);
            router.push("/nap-tien?action=momo");
          }}
        >
          Nạp Slime Coin
        </Box>
        <Box
          className={`${active === 3 ? "active" : ""}`}
          onClick={() => {
            handleSetActive(3);
            router.push("/nap-tien?action=card");
          }}
        >
          Đổi thẻ cào
        </Box>
        <Box
          className={`${active === 2 ? "active" : ""}`}
          onClick={() => {
            handleSetActive(2);
            router.push("/nap-tien?action=user");
          }}
        >
          Thông tin cá nhân
        </Box>
      </ListTab>
      {(() => {
        switch (active) {
          case 1:
            return (
              <Box width={"100%"}>
                <One handleSetActive={handleSetActive} />
              </Box>
            );

          case 2:
            return (
              <Box width={"100%"}>
                <Four />
              </Box>
            );
          case 3:
            return (
              <Box width={"100%"}>
                <Five />
              </Box>
            );

          default:
            return (
              <Box width={"100%"}>
                <Three />
              </Box>
            );
        }
      })()}
    </DashboardWrapper>
  );
}

export default Dashboard;
