import styled from "@emotion/styled";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import vnPay from "../../../api/vnPay";
import { useAppContext } from "../../../context/state";
import background from "../../../styles/assets/images/payment/BG.png";
import backgroundGR from "../../../styles/assets/images/payment/GroupPayment.png";

const BgWrap = styled(Box)(
  ({ theme }) => `
      height: 100vh;
      width: 100vw;
      display: flex;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 0;
      justify-content: center;
      align-items: center;
      background: url(${background.src});
      overflow:hidden;
      background-size: cover;    
    `
);

const BoxSelection = styled(Box)(
  ({ theme }) => `
        display: flex;
        justify-content: center;
        align-items: center;
        height: 653px;
   
      `
);

const VerifiedWrapper = styled(Box)(
  ({ theme }) => `
        height: 500px;
        width: 70%;
        display: flex;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
        background: url(${backgroundGR.src});
        text-align:center;
        background-size: contain;    
        background-repeat: no-repeat;
        background-position:center;
        padding: 0 65px;
        position:relative;
        z-index:1;
      `
);
interface PropsVerifiedPayment {
  token: string;
}
function VerifiedPayment({ token }: PropsVerifiedPayment) {
  const { handleLoginTrue } = useAppContext();
  const [count, setCount] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    const callToRegister = async () => {
      if (token) {
        setLoading(true);
        await vnPay
          .acceptPayment(token)
          .then((res) => {
            setLoading(false);

            // localStorage.setItem("access_token", res.data);
            setSuccess(true);
            setInterval(() => {
              handleLoginTrue();
              setCount((prev) => prev - 1);
            }, 1000);
          })
          .catch((err) => {
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };
    callToRegister();
  }, [token]);

  useEffect(() => {
    if (count === 0) {
      router.push("/nap-tien");
    }
  }, [count]);
  return (
    <BgWrap>
      <Container>
        <VerifiedWrapper>
          {loading && (
            <CircularProgress sx={{ color: "#fff", mt: 1 }} size={60} />
          )}
          {success && (
            <Typography variant="h5" color="#726550">
              Đơn nạp của bạn đã được thực hiện <br />{" "}
              <span style={{ fontSize: "15px" }}>
                Websize sẽ tự chuyển hướng trong ... {count}
              </span>
            </Typography>
          )}

          {error && (
            <Typography
              variant="h5"
              sx={{
                fontSize: {
                  md: "1.5rem",
                  xs: "15px",
                },
              }}
              color="#726550"
            >
              Có lỗi xảy ra, vui lòng liên hệ admin
            </Typography>
          )}
        </VerifiedWrapper>
      </Container>
    </BgWrap>
  );
}

export default VerifiedPayment;
