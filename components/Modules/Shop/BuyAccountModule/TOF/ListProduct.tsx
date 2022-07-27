/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Grid,
  Hidden,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function ListProductTOF() {
  return (
    <Box
      sx={{
        position: "relative",
        width: {
          lg: 1014,
          xs: "100%",
        },
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: {
            md: "0px 30px 50px",
            xs: "0px 7px 50px",
          },
          position: "relative",
          zIndex: 2,
        }}
        id="scrollTo"
      >
        <Grid container columnSpacing={3}>
          <Box width={"100%"}>
            <Typography
              textAlign={"center"}
              color="#4B66A2"
              sx={{
                fontSize: {
                  md: 25,
                  xs: 17,
                },
              }}
            >
              Không có kết quả tương ứng!
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default ListProductTOF;
