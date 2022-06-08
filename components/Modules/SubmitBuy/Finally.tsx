import {
  Box,
  Button,
  FormControl,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import React from "react";
import Divider from "../../../styles/assets/images/Shop/DividerGur.png";
import NextBTN from "../../../styles/assets/images/Shop/NextButton.png";
import BackBTN from "../../../styles/assets/images/Shop/BackButton.png";
import * as yup from "yup";
import { useFormik } from "formik";
import tagApi from "../../../api/tag";
import { useAppContext } from "../../../context/state";
import { useRouter } from "next/router";

interface GuaranteeProps {
  ids: string;
  hadSelected: number;
  handleStep: (s: number) => void;
}
const BorderWhite = styled(Box)(
  ({ theme }) => `
  padding: 15px 0;
  background: #fff;
  border-radius: 15px;
  margin-bottom: 15px;
    `
);

const ButtonGroup = styled(Box)(
  ({ theme }) => `
        position:absolute;
        z-index:2;
        width: 100%;
        right: 0;
        bottom: -93px;
        display:flex;       justify-content: flex-end;  `
);

const NextButton = styled(Button)(
  ({ theme }) => `
            background: url(${NextBTN.src});
          width: 250px;
          height: 60px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 20px; margin-left:15px;
          text-transform:capitalize; `
);
const BackButton = styled(Box)(
  ({ theme }) => `
  background: url(${BackBTN.src});
  width: 275px;
  height: 60px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;    `
);

const validationSchema = yup.object({
  phone: yup
    .string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Không đúng định dạng")
    .required("Xin hãy điền vào trường này"),
  gmail: yup.string().when("hadSelected", {
    is: true,
    then: yup
      .string()
      .email("Không đúng định dạng")
      .required("Must enter email address"),
  }),
});

function Finally({ ids, hadSelected, handleStep }: GuaranteeProps) {
  const { handleChangeMessageToast, handleChangeStatusToast } = useAppContext();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      hadSelected: hadSelected === 2,
      gmail: "",
      phone: "",
      social: "",
      others: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { gmail, phone, social, others } = values;
      let i = [];
      if (ids.includes(",")) {
        i = ids.split(",");
      } else {
        i.push(ids);
      }

      await tagApi
        .buyAccount({ gmail, others, phone, social, ids: i })
        .then((res) => {
          console.log(res);
          handleChangeStatusToast();
          handleChangeMessageToast("Bạn đã mua thành công");
          if (i.length > 1) {
            localStorage.removeItem("wishList");
          }
          router.push(`/bill/${res.data[2] && res.data[2].id}`);
        })
        .catch((err) => {
          handleChangeStatusToast();
          handleChangeMessageToast("Có lỗi xảy ra, vui lòng thử lại");
        });
    },
  });

  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Box
        height={530}
        sx={{ position: "relative", zIndex: 2 }}
        textAlign="center"
      >
        <Typography color={"#4B66A2"} fontSize={30}>
          Hoàn tất hồ sơ
        </Typography>
        <Image src={Divider} alt="" width={440} height={15}></Image>
        <Box width={800} sx={{ margin: "0 auto" }}>
          {hadSelected === 2 && (
            <Box>
              <Typography
                color="#50A7CD"
                textAlign={"left"}
                fontSize={20}
                mb={1}
              >
                Thay đổi thông tin gmail
              </Typography>
              <BorderWhite>
                <Grid container>
                  <Grid item md={6}>
                    <Typography
                      fontSize={17}
                      mt={2}
                      fontWeight={600}
                      textAlign="left"
                      ml={5}
                      color="#9CABCC"
                      fontFamily="Montserrat"
                    >
                      Gmail bạn muốn thay đổi:
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <FormControl sx={{ width: "25ch", position: "relative" }}>
                      <OutlinedInput
                        name="gmail"
                        placeholder="Ex: Abc@gmail.com"
                        value={formik.values.gmail}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.gmail && Boolean(formik.errors.gmail)
                        }
                      />
                      <Box
                        sx={{
                          fontFamily: "Montserrat",
                          position: "absolute",
                          bottom: "-18px",
                          fontSize: "13px",
                          color: "#d32f2f",
                        }}
                      >
                        {formik.touched.phone && formik.errors.phone}
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>
              </BorderWhite>
            </Box>
          )}

          <Typography color="#50A7CD" textAlign={"left"} fontSize={20} mb={1}>
            Thông tin liên lạc
          </Typography>
          <BorderWhite>
            <Grid container rowSpacing={3}>
              <Grid item md={6}>
                <Typography
                  fontSize={17}
                  mt={2}
                  fontWeight={600}
                  textAlign="left"
                  ml={5}
                  color="#9CABCC"
                  fontFamily="Montserrat"
                >
                  Số điện thoại:
                </Typography>
              </Grid>
              <Grid item md={6}>
                <FormControl sx={{ width: "25ch", position: "relative" }}>
                  <OutlinedInput
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                  />
                  <Box
                    sx={{
                      fontFamily: "Montserrat",
                      position: "absolute",
                      bottom: "-18px",
                      fontSize: "13px",
                      color: "#d32f2f",
                    }}
                  >
                    {formik.touched.phone && formik.errors.phone}
                  </Box>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <Typography
                  fontSize={17}
                  mt={2}
                  fontWeight={600}
                  textAlign="left"
                  ml={5}
                  color="#9CABCC"
                  fontFamily="Montserrat"
                >
                  Facebook, Zalo, Instagram, ... :
                </Typography>
              </Grid>
              <Grid item md={6}>
                <FormControl sx={{ width: "25ch" }}>
                  <OutlinedInput
                    name="social"
                    value={formik.values.social}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.social && Boolean(formik.errors.social)
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <Typography
                  fontSize={17}
                  mt={2}
                  fontWeight={600}
                  textAlign="left"
                  ml={5}
                  color="#9CABCC"
                  fontFamily="Montserrat"
                >
                  Khác:
                </Typography>
              </Grid>
              <Grid item md={6}>
                <FormControl sx={{ width: "25ch" }}>
                  <OutlinedInput
                    name="others"
                    value={formik.values.others}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.others && Boolean(formik.errors.others)
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </BorderWhite>
        </Box>
      </Box>
      <ButtonGroup>
        <BackButton
          onClick={() => {
            handleStep(2);
          }}
        >{`< Quay lại `}</BackButton>
        <NextButton type="submit">{`Mua >`}</NextButton>
      </ButtonGroup>
    </Box>
  );
}

export default Finally;
