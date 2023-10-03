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
  handleSetActive: (tab: number) => void;
}
const DashboardBox = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#F4ECE0",
  border: "1px solid #DAB88F",
  borderRadius: "30px",
  position: "relative",
  zIndex: "1",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  textAlign: "center",
  "@media (min-width:0)": {
    padding: "20px 20px",
    height: "auto",
  },
  "@media (min-width: 1024px)": {
    padding: "25px 40px",
    height: "590px",
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

function SelectedMenuFirst({
  handleValue,
  value,
  handleSetActive,
}: PropsSelectedMenu) {
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
  const getKeyFunc = async (bank: string) => {
    try {
      await paymentApi
        .getKey(bank)
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
      <Box>
        <Typography
          color="#726550"
          sx={{
            fontSize: {
              md: 32,
              xs: 20,
            },
          }}
        >
          Các hình thức thanh toán
        </Typography>
        <Image src={Devider} alt="devider" width={440} height={14} />
        <Box textAlign={"left"}>
          <CustomizedRadios handleValue={handleValue} />
        </Box>
        <Box sx={{ margin: "0 auto", width: { md: 750, xs: "100%" } }}>
          {(() => {
            switch (value) {
              case "momo":
                return (
                  <Box
                    textAlign={"left"}
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          md: 25,
                          xs: 15,
                        },
                      }}
                      color="#9C6546"
                      mt={1}
                    >
                      Số điện thoại:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          md: 28,
                          xs: 13,
                        },
                        display: "flex",
                      }}
                      color="#D09B5F"
                      mt={1}
                    >
                      0865075757 - TRAN MINH VU
                      <Tooltip
                        title={notification}
                        arrow
                        placement="right"
                        sx={{ ml: 1 }}
                      >
                        <ContentCopyIcon
                          onMouseLeave={resetCopy}
                          onClick={() => {
                            copy("0865075757");
                          }}
                        />
                      </Tooltip>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          md: 28,
                          xs: 13,
                        },
                      }}
                      color="#9C6546"
                      mt={1}
                    >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
                    <Box
                      mt={3}
                      sx={{
                        "#buttonAuth": {
                          width: 250,
                          height: 57,
                          fontSize: "17px",
                        },
                      }}
                    >
                      <button
                        id="buttonAuth"
                        onClick={() => {
                          handleSetActive(2);
                        }}
                      >
                        Xem số dư
                      </button>
                    </Box>
                    {/* <Typography
                    sx={{
                      fontSize: {
                        md: 15,
                        xs: 13,
                      },
                    }}
                    color="#9C6546"
                    mt={1}
                  >
                    {`Nội dung: `}
                  </Typography> */}
                    {/* <Box sx={{ display: "flex", mt: 0.5 }}>
                    <SpanGetData>
                      <p>{key}</p>
                    </SpanGetData>

                    <Button
                      onClick={() => {
                        getKeyFunc("MOMO");
                      }}
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
                      Lấy mã
                    </Button>
                  </Box> */}
                    {/* <Typography
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
                    * Sau khi lấy mã, mã sẽ tồn tại trong <span>5 phút</span>.
                    Vui lòng sử dụng trước khi mã hết hạn! Bạn có thế click{" "}
                    <span>lấy mã</span> để làm mới mã.
                  </Typography> */}
                  </Box>
                );

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
                          md: 25,
                          xs: 15,
                        },
                      }}
                      color="#9C6546"
                      mt={1}
                      textAlign={"center"}
                    >
                      Số tài khoản:
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: {
                          md: 28,
                          xs: 13,
                        },
                        display: "flex",
                      }}
                      color="#D09B5F"
                      mt={1}
                      textAlign={"center"}
                    >
                      VietComBank - 1035300889
                      <Hidden smDown> - </Hidden>
                      <Hidden smUp>
                        <br />
                      </Hidden>
                      Lê Nguyễn Thùy Phương
                      <Tooltip
                        title={notification}
                        arrow
                        placement="right"
                        sx={{ ml: 1 }}
                      >
                        <ContentCopyIcon
                          onMouseLeave={resetCopy}
                          onClick={() => {
                            copy("1035300889");
                          }}
                        />
                      </Tooltip>
                    </Typography>
                    {/* <Typography
                    sx={{
                      fontSize: {
                        md: 28,
                        xs: 13,
                      },
                    }}
                    color="#9C6546"
                    mt={1}
                  >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography> */}
                    <Typography
                      sx={{
                        fontSize: {
                          md: 18,
                          xs: 13,
                        },
                      }}
                      color="#9C6546"
                      mt={1}
                      textAlign={"center"}
                    >
                      {`Nội dung: `}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        mt: 0.5,
                        justifyContent: "center",
                      }}
                    >
                      <SpanGetData>
                        <p>{key}</p>
                      </SpanGetData>

                      <Button
                        onClick={() => {
                          getKeyFunc("VCB");
                        }}
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
                        Lấy mã
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
                          md: 15,
                          xs: 12,
                        },
                        textAlign: "center",
                      }}
                    >
                      * Sau khi lấy mã, mã sẽ tồn tại trong <span>5 phút</span>.{" "}
                      <br />
                      Vui lòng sử dụng trước khi mã hết hạn! Bạn có thế click{" "}
                      <span>lấy mã</span> để làm mới mã.
                    </Typography>
                  </Box>
                );
                break;
              default:
                return (
                  <Box
                    textAlign={"left"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          md: 25,
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
                          md: 28,
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
                          md: 28,
                          xs: 13,
                        },
                      }}
                      color="#9C6546"
                      mt={1}
                    >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
                    <Box
                      mt={3}
                      sx={{
                        "#buttonAuth": {
                          width: 250,
                          height: 57,
                          fontSize: "17px",
                        },
                      }}
                    >
                      <button
                        id="buttonAuth"
                        onClick={() => {
                          handleSetActive(2);
                        }}
                      >
                        Xem số dư
                      </button>
                    </Box>
                  </Box>
                );
            }
          })()}
        </Box>
      </Box>

      <Box>
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
            <span>Lưu ý:</span> Vui lòng nạp đúng nội dung để được cộng tiền
            nhanh nhất. Những tài khoản nạp sai nội dung của website sẽ bị trừ{" "}
            <span>10% số tiền</span>. Sau khi nạp từ 10-15 phút chưa nhận được
            tiền trong tài khoản vui lòng liên hệ <span>Admin</span> để được hỗ
            trợ.
          </Typography>
        </Box>
      </Box>
    </DashboardBox>
  );
}

export default SelectedMenuFirst;
