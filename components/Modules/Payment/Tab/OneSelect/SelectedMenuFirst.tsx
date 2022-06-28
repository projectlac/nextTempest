import styled from "@emotion/styled";
import { Box, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import Devider from "../../../../../styles/assets/images/payment/PaymentDevider.png";
import CustomizedRadios from "../../CustomItem/CustomizedRadios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import clickToCopy from "../../../../../utility/clickToCopy";
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
    height: "500px",
  },
  "@media (min-width: 1024px)": {
    padding: "40px",
    height: "550px",
  },
}));
function SelectedMenuFirst({ handleValue, value }: PropsSelectedMenu) {
  const [notification, setNotification] = useState<string>("Copy");
  const copySuccess = () => {
    setNotification("Copied!");
  };
  const resetCopy = () => {
    setNotification("Copy");
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
        Các hình thức thanh toán
      </Typography>
      <Image src={Devider} alt="devider" width={440} height={14} />
      <Box textAlign={"left"}>
        <CustomizedRadios handleValue={handleValue} />
      </Box>
      <Box sx={{ margin: "0 auto" }} width={440}>
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
                    Số điện thoại:
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
                  >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
                </Box>
              );
              break;
            case "bank":
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
                    Số tài khoản:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        md: 16,
                        xs: 13,
                      },
                    }}
                    color="#D09B5F"
                    mt={1}
                  >
                    <span style={{ display: "flex" }}>
                      TP bank - 04366222601 - TRAN MINH VU
                      <Tooltip
                        title={notification}
                        arrow
                        placement="right"
                        sx={{ ml: 1 }}
                      >
                        <ContentCopyIcon
                          onMouseLeave={resetCopy}
                          onClick={() => {
                            copy("04366222601");
                          }}
                        />
                      </Tooltip>
                    </span>
                    Nickname Shop - Tempestgenshin
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
                    MB bank - 78989899992 - TRAN MINH VU{" "}
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
                        md: 16,
                        xs: 13,
                      },
                    }}
                    color="#9C6546"
                    mt={1}
                  >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
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
                  >{`Nội dung: NAPTIEN + “Tên tài khoản"`}</Typography>
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
          <span>Lưu ý:</span> Vui lòng nạp đúng nội dung để được cộng tiền nhanh
          nhất. Những tài khoản nạp sai nội dung của website sẽ bị trừ{" "}
          <span>10% số tiền</span>. Sau khi nạp từ 10-15 phút chưa nhận được
          tiền trong tài khoản vui lòng liên hệ <span>Admin</span> để được hỗ
          trợ.
        </Typography>
      </Box>
    </DashboardBox>
  );
}

export default SelectedMenuFirst;
