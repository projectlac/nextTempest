import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import React, { useState } from "react";
import Divider from "../../../styles/assets/images/Shop/DividerGur.png";
import NextBTN from "../../../styles/assets/images/Shop/NextButton.png";
import BackBTN from "../../../styles/assets/images/Shop/BackButton.png";
import * as yup from "yup";
import { useFormik } from "formik";
import tagApi from "../../../api/tag";
import { useAppContext } from "../../../context/state";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
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
  () => `
        position:absolute;
        z-index:2;
        width: 100%;
        right: 0;
        bottom: -40px;
        display:flex;       justify-content: flex-end;  `
);

const NextButton = styled(Button)(() => ({
  background: `url(${NextBTN.src})`,
  width: "250px",
  height: "60px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
  marginLeft: "15px",
  textTransform: "capitalize",
  "@media (min-width:0)": {
    fontSize: "15px",
  },
  "@media (min-width: 768px)": {
    fontSize: "20px",
  },
}));
const BackButton = styled(Box)(() => ({
  background: `url(${BackBTN.src})`,
  width: "275px",
  height: "60px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "20px",
  "@media (min-width:0)": {
    fontSize: "15px",
  },
  "@media (min-width: 768px)": {
    fontSize: "20px",
  },
}));
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
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
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
          handleChangeStatusToast();
          handleChangeMessageToast("Bạn đã mua thành công");
          if (i.length > 1) {
            localStorage.removeItem("wishList");
          }
          router.push(`/bill/${res.data[2] && res.data[2].id}`);
        })
        .catch((err) => {
          handleChangeStatusToast();
          handleChangeMessageToast(
            err.response.data.message
              ? err.response.data.message
              : "Có lỗi xảy ra, vui lòng thử lại"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          padding: "25px 0",
          height: { md: 530, xs: 580 },
        }}
        textAlign="center"
      >
        <Typography
          color={"#4B66A2"}
          sx={{
            fontSize: { md: 30, xs: 17 },
          }}
        >
          Hoàn tất hồ sơ
        </Typography>
        <Image src={Divider} alt="" width={440} height={15}></Image>
        <Box sx={{ margin: "0 auto", width: { md: "800px", xS: "100%" } }}>
          {hadSelected === 2 && (
            <Box>
              <Typography
                color="#50A7CD"
                textAlign={"left"}
                sx={{
                  fontSize: { md: 20, xs: 15 },
                }}
                mb={1}
              >
                Thay đổi thông tin gmail
              </Typography>
              <BorderWhite>
                <Grid container>
                  <Grid item md={6} xs={12}>
                    <Typography
                      sx={{
                        fontSize: { md: 17, xs: 13 },
                        mt: { md: 2, xs: 0 },
                        ml: { md: 5, xs: 2 },
                      }}
                      fontWeight={600}
                      textAlign="left"
                      color="#9CABCC"
                      fontFamily="Montserrat"
                    >
                      Gmail bạn muốn thay đổi:
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl
                      sx={{
                        width: { md: "25ch", xs: "90%" },
                        position: "relative",
                      }}
                    >
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

          <Typography
            color="#50A7CD"
            textAlign={"left"}
            sx={{
              fontSize: { md: 20, xs: 15 },
            }}
            mb={1}
          >
            Thông tin liên lạc
          </Typography>
          <BorderWhite>
            <Grid container rowSpacing={{ xs: 0, md: 3 }}>
              <Grid item md={6} xs={12}>
                <Typography
                  sx={{
                    fontSize: { md: 17, xs: 13 },
                    mt: { md: 2, xs: 0 },
                    ml: { md: 5, xs: 2 },
                  }}
                  fontWeight={600}
                  textAlign="left"
                  color="#9CABCC"
                  fontFamily="Montserrat"
                >
                  Số điện thoại:
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl
                  sx={{
                    width: { md: "25ch", xs: "90%" },
                    position: "relative",
                  }}
                >
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
              <Grid item md={6} xs={12}>
                <Typography
                  sx={{
                    fontSize: { md: 17, xs: 13 },
                    mt: { md: 2, xs: 0 },
                    ml: { md: 5, xs: 2 },
                  }}
                  fontWeight={600}
                  textAlign="left"
                  color="#9CABCC"
                  fontFamily="Montserrat"
                >
                  Facebook, Zalo, Instagram, ... :
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl sx={{ width: { md: "25ch", xs: "90%" } }}>
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
              <Grid item md={6} xs={12}>
                <Typography
                  sx={{
                    fontSize: { md: 17, xs: 13 },
                    mt: { md: 2, xs: 0 },
                    ml: { md: 5, xs: 2 },
                  }}
                  fontWeight={600}
                  textAlign="left"
                  color="#9CABCC"
                  fontFamily="Montserrat"
                >
                  Bạn biết shop qua đâu
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl sx={{ width: { md: "25ch", xs: "90%" } }}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="others"
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      sx={{
                        ".MuiFormControlLabel-label": {
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                        },
                      }}
                      value="Damper"
                      control={<Radio />}
                      label="Damper"
                    />
                    <FormControlLabel
                      sx={{
                        ".MuiFormControlLabel-label": {
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                        },
                      }}
                      value="Nino"
                      control={<Radio />}
                      label="Nino"
                    />
                    <FormControlLabel
                      sx={{
                        ".MuiFormControlLabel-label": {
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                        },
                      }}
                      value="Kwan"
                      control={<Radio />}
                      label="Kwan"
                    />
                    <FormControlLabel
                      sx={{
                        ".MuiFormControlLabel-label": {
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                        },
                      }}
                      value="Game Lab
"
                      control={<Radio />}
                      label="Game Lab
"
                    />
                    <FormControlLabel
                      sx={{
                        ".MuiFormControlLabel-label": {
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                        },
                      }}
                      value="Page HSR Việt Nam
"
                      control={<Radio />}
                      label="Page HSR Việt Nam
"
                    />
                    <FormControlLabel
                      sx={{
                        ".MuiFormControlLabel-label": {
                          fontFamily: "Montserrat",
                          fontWeight: "bold",
                        },
                      }}
                      value="Khác"
                      control={<Radio />}
                      label="Khác"
                    />
                  </RadioGroup>
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
        <NextButton type="submit">
          {loading ? <CircularProgress sx={{ color: "#fff" }} /> : `Mua >`}
        </NextButton>
      </ButtonGroup>
    </Box>
  );
}

export default Finally;
