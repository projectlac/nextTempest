import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import Devider from "../../../../styles/assets/images/payment/PaymentDevider.png";

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
    height:80px;
    background: #F2EEE9;
    border: 2px solid rgb(181, 110, 79);
    border-radius: 20px;
    margin-bottom:50px;
    font-size: 18px;
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
    height:60px;
    margin-bottom:30px;
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
  const LoginSchema = Yup.object().shape({
    code: Yup.string().required("*Mã thẻ không được để trống "),
    seri: Yup.string().required("*Số seri không được để trống "),
    type: Yup.string().required("*Loại thẻ không được để trống "),
    cost: Yup.string().required("*Giá trị thẻ không được để trống"),
  });
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
              seri: "",
              type: "",
              cost: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              const { code, seri } = values;
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box width={"90%"} sx={{ margin: "0 auto" }}>
                  <Box sx={{ position: "relative" }}>
                    <CustomField
                      name="type"
                      placeholder="Chọn loại thẻ"
                      style={{
                        borderColor:
                          errors.type && touched.type
                            ? "#e90000"
                            : "rgb(181, 110, 79)",
                      }}
                    />
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
                      name="seri"
                      placeholder="Seri thẻ"
                      style={{
                        borderColor:
                          errors.seri && touched.seri
                            ? "#e90000"
                            : "rgb(181, 110, 79)",
                      }}
                    />
                  </Box>

                  <Box sx={{ position: "relative" }}>
                    <CustomField
                      name="cost"
                      as="select"
                      placeholder="Chọn giá trị thẻ"
                      style={{
                        borderColor:
                          errors.cost && touched.cost
                            ? "#e90000"
                            : "rgb(181, 110, 79)",
                      }}
                    >
                      <option value="red">Red</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
                    </CustomField>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                    margin: {
                      md: "0 auto 40px",
                      sm: "0 auto 33px",
                      lg: "0 auto 30px",
                      xs: "25px auto 25px",
                    },
                    color: "#726550",
                  }}
                ></Box>

                <button id="buttonAuth" type="submit">
                  Nạp ngay!
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
            <span>Lưu ý:</span> Vui lòng nạp đúng nội dung để được cộng tiền
            nhanh nhất. Những tài khoản nạp sai nội dung của website sẽ bị trừ
            <span>10% số tiền</span>. Sau khi nạp từ 10-15 phút chưa nhận được
            tiền trong tài khoản vui lòng liên hệ <span>Admin</span> để được hỗ
            trợ.
          </Typography>
        </Box>
      </Box>
    </DashboardBox>
  );
}

export default Five;
