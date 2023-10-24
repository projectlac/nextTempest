import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import Devider from "../../../../styles/assets/images/payment/PaymentDevider.png";
import { useState } from "react";
import paymentApi from "../../../../api/paymentApi";
import { useAppContext } from "../../../../context/state";

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

const CustomField = styled(Field)(
  ({ theme }) => `
    width: 100%;
    height:50px;
    background: #F2EEE9;
    border: 2px solid rgb(181, 110, 79);
    border-radius: 20px;
    margin-bottom:20px;
    font-size: 15px;
    padding: 15px 25px;
    font-family: 'Signika';
    @media (max-width: 435px) {
      height:50px;
      margin-bottom:30px;
      font-size: 15px;
    }
    @media (min-width: 768px) {
      height:50px;
      margin-bottom:27px;
      font-size: 15px;
  
   } 
  
   @media (min-width: 1024px) {
    height:50px;
    margin-bottom:15px;
    font-size: 15px;
  
  } 
  @media (min-width: 1440px) {
      height: 55px;
    font-size: 18px;
    margin-bottom: 10px;

  } 
          `
);

function Five() {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleChangeStatusToast, handleChangeMessageToast } = useAppContext();
  const LoginSchema = Yup.object().shape({
    code: Yup.string().required("*Mã thẻ không được để trống "),
    serial: Yup.string().required("*Số seri không được để trống "),
    telco: Yup.string().required("*Loại thẻ không được để trống "),
    amount: Yup.string().required("*Giá trị thẻ không được để trống"),
  });

  const telcoList = [
    { value: "VIETTEL", title: "Viettel" },
    { value: "MOBIFONE", title: "MobiPhone" },
    { value: "VINAPHONE", title: "VinaPhone" },
    { value: "VIETNAMOBILE", title: "VietnamMobile" },
    { value: "ZING", title: "Zing" },
  ];

  const amountList = [
    { value: "10000", title: "10.000 VND" },
    { value: "20000", title: "20.000 VND" },
    { value: "30000", title: "30.000 VND" },
    { value: "50000", title: "50.000 VND" },
    { value: "100000", title: "100.000 VND" },
    { value: "200000", title: "200.000 VND" },
    { value: "300000", title: "300.000 VND" },
    { value: "500000", title: "500.000 VND" },
    { value: "1000000", title: "1.000.000 VND" },
  ];

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
          Nạp tiền bằng thẻ cào
        </Typography>
        <Image src={Devider} alt="devider" width={440} height={14} />
        <Box mt={2}>
          <Formik
            initialValues={{
              code: "",
              serial: "",
              telco: "VIETTEL",
              amount: "10000",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { resetForm }) => {
              const { code, serial, telco, amount } = values;
              try {
                setLoading(true);
                const res = await paymentApi.topUpWithCard(
                  telco,
                  +amount,
                  serial,
                  code
                );
                if (res.data.result) {
                  handleChangeStatusToast();
                  handleChangeMessageToast(
                    res.data.result ?? "Đổi thẻ thành công"
                  );
                  resetForm();
                }
              } catch (error) {
                handleChangeStatusToast();
                handleChangeMessageToast(error.response.data.message);
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box width={"90%"} sx={{ margin: "0 auto" }}>
                  <Box sx={{ position: "relative" }}>
                    <CustomField
                      name="telco"
                      as="select"
                      placeholder="Chọn loại thẻ"
                      style={{
                        borderColor:
                          errors.telco && touched.telco
                            ? "#e90000"
                            : "rgb(181, 110, 79)",
                      }}
                    >
                      {telcoList.map((d) => (
                        <option value={d.value} key={d.value}>
                          {d.title}
                        </option>
                      ))}
                    </CustomField>
                  </Box>
                  <Box sx={{ position: "relative" }}>
                    <CustomField
                      name="code"
                      placeholder="Mã thẻ"
                      style={{
                        borderColor:
                          errors.code && touched.code
                            ? "#e90000"
                            : "rgb(181, 110, 79)",
                      }}
                    />
                  </Box>
                  <Box sx={{ position: "relative" }}>
                    <CustomField
                      name="serial"
                      placeholder="Seri thẻ"
                      style={{
                        borderColor:
                          errors.serial && touched.serial
                            ? "#e90000"
                            : "rgb(181, 110, 79)",
                      }}
                    />
                  </Box>

                  <Box sx={{ position: "relative" }}>
                    <CustomField
                      name="amount"
                      as="select"
                      placeholder="Chọn giá trị thẻ"
                      style={{
                        borderColor:
                          errors.amount && touched.amount
                            ? "#e90000"
                            : "rgb(181, 110, 79)",
                      }}
                    >
                      {amountList.map((d) => (
                        <option value={d.value} key={d.value}>
                          {d.title}
                        </option>
                      ))}
                    </CustomField>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                    margin: {
                      md: "0 auto 20px",
                      sm: "0 auto 33px",
                      lg: "0 auto 30px",
                      xs: "25px auto 25px",
                    },
                    color: "#726550",
                  }}
                ></Box>

                <button id="buttonAuth" type="submit" disabled={loading}>
                  {loading ? "Đang xử lý..." : "Nạp ngay!"}
                </button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <Box>
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
            <span>Lưu ý:</span> <br /> - Cần điền đúng seri, điền sai khiếu nại
            sẽ không xử lý.
            <br /> - Nạp thẻ cào sẽ nhận được % theo giá trị đổi thẻ hiện tại.{" "}
            <br />
            Sau khi nạp từ 10-15 phút chưa nhận được tiền trong tài khoản vui
            lòng liên hệ <span>Admin</span> để được hỗ trợ.
          </Typography>
        </Box>
      </Box>
    </DashboardBox>
  );
}

export default Five;
