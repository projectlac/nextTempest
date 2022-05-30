import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CustomizedAccordions from "./Accordion/CustomizedAccordions";

const FilterBox = styled(Box)(
  ({ theme }) => `
  min-height: 1300px;
  border-radius: 40px;
  background: #fff;
  border: 2px solid #C4CEE2;
  padding: 40px 25px 40px 35px;
    `
);

function Filter() {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
      }}
    >
      <Box sx={{ padding: { lg: "70px 30px 50px", xs: "70px 10px 50px" } }}>
        <FilterBox>
          <Typography sx={{ fontSize: "25px", color: "#4B66A2" }}>
            Tìm theo:
          </Typography>
          <CustomizedAccordions />
        </FilterBox>
      </Box>
    </Box>
  );
}

export default Filter;
