import styled from "@emotion/styled";
import { Box, Button, Hidden, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Devider from "../../../../../styles/assets/images/payment/PaymentDevider.png";
import CustomizedRadios from "../../CustomItem/CustomizedRadios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import clickToCopy from "../../../../../utility/clickToCopy";
import paymentApi from "../../../../../api/paymentApi";
interface PropsSelectedMenu {
  handleValue: (value: string) => void;
  value: string;
}
const DashboardBox = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#F4ECE0",
  border: "1px solid #DAB88F",
  borderRadius: "30px",
  position: "relative",
  zIndex: "1",

  textAlign: "center",
  "@media (min-width:0)": {
    padding: "20px 20px",
    height: "auto",
  },
  "@media (min-width: 1024px)": {
    padding: "40px",
    height: "550px",
  },
}));

const SpanGetData = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "50px",
  color: "#D09B5F",
  background: "#e0d8cd",
  borderRadius: "15px",
  "@media (min-width:0)": {
    width: "75%",
  },
  "@media (min-width: 1024px)": {
    width: "250px",
  },
}));
function SelectedMenuFirst({ handleValue, value }: PropsSelectedMenu) {
  const [notification, setNotification] = useState<string>("Copy");
  const [key, setKey] = useState<string>("");

  const copySuccess = () => {
    setNotification("Copied!");
  };
  const resetCopy = () => {
    setNotification("Copy");
  };
  useEffect(() => {
    setKey("");
  }, [value]);
  const getKeyFunc = async () => {
    try {
      await paymentApi
        .getKey()
        .then((res) => {
          setKey(res.data);
        })
        .catch(() => setKey("Error!"));
    } catch (error) {
      setKey("Error!");
    }
  };
  const copy = (text: string) => {
    copySuccess();
    clickToCopy(text);
  };
  return (
    <DashboardBox>
      <Typography
        color="#726550"
        sx={{
          fontSize: {
            md: 32,
            xs: 20,
          },
        }}
      >
        C??c h??nh th???c thanh to??n
      </Typography>
      <Image src={Devider} alt="devider" width={440} height={14} />
      <Box textAlign={"left"}>
        <CustomizedRadios handleValue={handleValue} />
      </Box>
      <Box sx={{ margin: "0 auto", width: { md: 440, xs: "100%" } }}>
        {(() => {
          switch (value) {
            case "momo":
              return (
                <Box textAlign={"left"}>
                  <Typography
                    sx={{
                      fontSize: {
                        md: 20,
                        xs: 15,
                      },
                    }}
                    color="#9C6546"
                    mt={1}
                  >
                    S??? ??i???n tho???i:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        md: 16,
                        xs: 13,
                      },
                      display: "flex",
                    }}
                    color="#D09B5F"
                    mt={1}
                  >
                    0344723594 - TRAN MINH VU
                    <Tooltip
                      title={notification}
                      arrow
                      placement="right"
                      sx={{ ml: 1 }}
                    >
                      <ContentCopyIcon
                        onMouseLeave={resetCopy}
                        onClick={() => {
                          copy("0344723594");
                        }}
                      />
                    </Tooltip>
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: {
                        md: 16,
                        xs: 13,
                      },
                    }}
                    color="#9C6546"
                    mt={1}
                  >{`N???i dung: NAPTIEN + ???T??n t??i kho???n"`}</Typography>
                </Box>
              );
              break;
            case "bank":
              return (
                <Box
                  textAlign={"left"}
                  sx={{
                    position: "relative",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        md: 17,
                        xs: 15,
                      },
                    }}
                    color="#9C6546"
                    mt={1}
                  >
                    S??? t??i kho???n:
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: {
                        md: 15,
                        xs: 13,
                      },
                      display: "flex",
                    }}
                    color="#D09B5F"
                    mt={0.5}
                  >
                    MB bank - 78989899992
                    <Hidden smDown> - </Hidden>
                    <Hidden smUp>
                      <br />
                    </Hidden>
                    TRAN MINH VU
                    <Tooltip
                      title={notification}
                      arrow
                      placement="right"
                      sx={{ ml: 1 }}
                    >
                      <ContentCopyIcon
                        onMouseLeave={resetCopy}
                        onClick={() => {
                          copy("78989899992");
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        md: 15,
                        xs: 13,
                      },
                    }}
                    color="#9C6546"
                    mt={1}
                  >
                    {`N???i dung: `}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 0.5 }}>
                    <SpanGetData>
                      <p>{key}</p>
                    </SpanGetData>

                    <Button
                      onClick={getKeyFunc}
                      sx={{
                        width: "100px",
                        borderRadius: "15px",
                        ml: 5,
                        background: "#D09B5F",
                        textTransform: "none",
                      }}
                      disableElevation
                      variant="contained"
                    >
                      L???y m??
                    </Button>
                  </Box>
                  <Typography
                    color="#C69E72"
                    sx={{
                      "& span": {
                        color: "#94674B",
                      },
                      position: { md: "absolute", xs: "relative" },
                      padding: "5px 0",
                      left: 0,
                      right: 0,
                      margin: "0 auto",
                      fontSize: {
                        md: 12,
                        xs: 12,
                      },
                    }}
                  >
                    * Sau khi l???y m??, m?? s??? t???n t???i trong <span>5 ph??t</span>.
                    Vui l??ng s??? d???ng tr?????c khi m?? h???t h???n! B???n c?? th??? click{" "}
                    <span>l???y m??</span> ????? l??m m???i m??.
                  </Typography>
                </Box>
              );
              break;
            default:
              return (
                <Box textAlign={"left"}>
                  <Typography
                    sx={{
                      fontSize: {
                        md: 20,
                        xs: 15,
                      },
                    }}
                    color="#9C6546"
                    mt={1}
                  >
                    Paypal:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        md: 16,
                        xs: 13,
                      },
                      display: "flex",
                    }}
                    color="#D09B5F"
                    mt={1}
                  >
                    hhuongtinlatao@gmail.com
                    <Tooltip
                      title={notification}
                      arrow
                      placement="right"
                      sx={{ ml: 1 }}
                    >
                      <ContentCopyIcon
                        onMouseLeave={resetCopy}
                        onClick={() => {
                          copy("hhuongtinlatao@gmail.com");
                        }}
                      />
                    </Tooltip>
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        md: 16,
                        xs: 13,
                      },
                    }}
                    color="#9C6546"
                    mt={1}
                  >{`N???i dung: NAPTIEN + ???T??n t??i kho???n"`}</Typography>
                </Box>
              );
          }
        })()}
      </Box>

      <Box sx={{ mt: { md: 5, xs: 2 } }} mb={1}>
        <Image src={Devider} alt="devider" width={440} height={14} />
      </Box>
      <Box>
        <Typography
          color="#C69E72"
          sx={{
            "& span": {
              color: "#94674B",
            },
            fontSize: {
              md: 14,
              xs: 12,
            },
          }}
        >
          <span>L??u ??:</span> Vui l??ng n???p ????ng n???i dung ????? ???????c c???ng ti???n nhanh
          nh???t. Nh???ng t??i kho???n n???p sai n???i dung c???a website s??? b??? tr???{" "}
          <span>10% s??? ti???n</span>. Sau khi n???p t??? 10-15 ph??t ch??a nh???n ???????c
          ti???n trong t??i kho???n vui l??ng li??n h??? <span>Admin</span> ????? ???????c h???
          tr???.
        </Typography>
      </Box>
    </DashboardBox>
  );
}

export default SelectedMenuFirst;
