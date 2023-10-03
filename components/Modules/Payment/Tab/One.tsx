import styled from "@emotion/styled";
import { Box, Grid, Hidden, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import audit from "../../../../api/audit";
import avatar from "../../../../data/avatar";
import BGName from "../../../../styles/assets/images/payment/BGName.png";
import Crystal from "../../../../styles/assets/images/payment/Crystal.png";
import PaimonPayment from "../../../../styles/assets/images/payment/PaimonPayment.png";
import coin from "../../../../styles/assets/images/payment/coin.png";
import SelectedMenuFirst from "./OneSelect/SelectedMenuFirst";
import SelectedMenuSecond from "./OneSelect/SelectedMenuSecond";
import SelectedMenuThird from "./OneSelect/SelectedMenuThird";

const DashboardBox = styled(Box)(({ theme }) => ({
  height: "555px",
  width: "100%",
  backgroundColor: "#F4ECE0",
  border: "1px solid #DAB88F",
  borderRadius: "30px",
  position: "relative",
  zIndex: "1",
  padding: "40px",
  textAlign: "center",
  "@media (min-width:0)": {
    height: "300px",
    zIndex: "2",
    marginTop: "35px",
  },
  "@media (min-width:768px)": {
    zIndex: "2",
    marginTop: "75px",
  },
  "@media (min-width: 1024px)": {
    height: "555px",
    marginTop: "0",
  },
}));
const AvatarBox = styled(Box)({
  width: "125px",
  height: "125px",
  margin: "0 auto",
  position: "relative",
});
const ImageBox = styled(Box)({
  borderRadius: "50%",
  width: "125px",
  height: "125px",
  border: "6px solid #BFAE9B",
  overflow: "hidden",
  marginTop: "-80px",
  background: "#fff",
});
const CrystalBox = styled(Box)({
  width: "49px",
  height: "45px",
  position: "absolute",
  bottom: "-17px",
  left: 0,
  right: 0,
  margin: "0 auto",
});
const NameBox = styled(Box)({
  width: "296px",
  height: "44px",
  background: `url(${BGName.src})`,

  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  paddingTop: "7px",
  "@media (min-width:0)": {
    position: "relative",
    margin: "0 auto",
    width: "100%",
  },
  "@media (min-width:403px)": {
    position: "relative",
    margin: "0 auto",
    width: "296px",
  },
  "@media (min-width: 768px)": {
    position: "relative",
    margin: "0 auto",
  },
  "@media (min-width: 1024px)": {
    position: "absolute",
    left: "-38px",
  },
});
const TextBox = styled(Typography)({
  color: "#726550",

  cursor: "pointer",
  "&.active": {
    color: "#D09B5F",
    "@media (min-width:0)": {
      background: "#fff",
      borderRadius: "30px",
    },
    "@media (min-width: 1024px)": {
      background: "transparent",
      borderRadius: "0",
    },
  },
  "@media (min-width:0)": {
    borderBottom: "none",
    width: "25%",
    padding: "7px 0",
    fontSize: "11px",
    "&:nth-of-type(2)": {
      width: "50%",
    },
  },
  "@media (min-width: 1024px)": {
    borderBottom: "1px solid #DCD0BF",
    width: "auto",
    padding: "10px 0",
    fontSize: "17px",
    "&:nth-of-type(2)": {
      width: "auto",
    },
  },
});
const Paimon = styled(Box)({
  position: "absolute",
  bottom: "-80px",
  left: "0",
  right: "0",
  margin: "0 auto",
});

interface IOneTabProps {
  handleSetActive: (tab: number) => void;
}

function One({ handleSetActive }: IOneTabProps) {
  const [value, setValue] = React.useState<string>("momo");
  const [avatarCurrency, setAvatarCurrency] = React.useState<number>(0);

  const router = useRouter();

  const handleValue = (data: string) => {
    setValue(data);
  };

  const avatarTemp = localStorage.getItem("avatar");

  React.useEffect(() => {
    if (Boolean(avatarTemp)) {
      setAvatarCurrency(+avatarTemp);
    } else {
      audit.getProfile().then((res) => {
        if (res.data.avatar) {
          localStorage.setItem("avatar", res.data.avatar);
          setAvatarCurrency(res.data.avatar);
        }
      });
    }
  }, [avatarCurrency, avatarTemp]);

  return (
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
      <Grid
        item
        md={12}
        xs={12}
        sx={{
          mt: { md: 0, xs: 2 },
        }}
      >
        <SelectedMenuFirst
          handleValue={handleValue}
          value={value}
          handleSetActive={handleSetActive}
        />
      </Grid>
    </Grid>
  );
}

export default One;
