import {
  Box,
  FormControl,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import React from "react";
import Divider from "../../../styles/assets/images/Shop/DividerGur.png";

interface GuaranteeProps {
  ids: string;
  hadSelected: number;
}
const BorderWhite = styled(Box)(
  ({ theme }) => `
  padding: 15px 0;
  background: #fff;
  border-radius: 15px;
  margin-bottom: 15px;
    `
);
function Finally({ ids, hadSelected }: GuaranteeProps) {
  return (
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
            <Typography color="#50A7CD" textAlign={"left"} fontSize={20} mb={1}>
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
                  <FormControl sx={{ width: "25ch" }}>
                    <OutlinedInput placeholder="Ex: Abc@gmail.com" />
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
              <FormControl sx={{ width: "25ch" }}>
                <OutlinedInput required />
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
                <OutlinedInput />
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
                <OutlinedInput />
              </FormControl>
            </Grid>
          </Grid>
        </BorderWhite>
      </Box>
    </Box>
  );
}

export default Finally;
