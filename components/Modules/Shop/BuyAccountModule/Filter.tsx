import styled from "@emotion/styled";
import { Hidden, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CustomizedAccordions from "./Accordion/CustomizedAccordions";
import CloseIcon from "@mui/icons-material/Close";
const FilterBox = styled(Box)(({ theme }) => ({
  borderRadius: "40px",
  background: "#fff",
  border: "2px solid #C4CEE2",
  padding: "40px 25px 40px 35px",
  position: "relative",
  "@media (min-width:0)": {
    height: "560px",
    minHeight: "auto",
    borderRadius: "15px",
    overflow: "hidden",
  },
  "@media (min-width: 1024px)": {
    height: "auto",
    borderRadius: "40px",
    minHeight: "1300px",
    overflow: "auto",
  },
}));
interface IBuy {
  slug: string;
  handleClose?: () => void;
}
function Filter({ slug, handleClose }: IBuy) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
      }}
    >
      <Box sx={{ padding: "0 15px" }}>
        <FilterBox>
          <Typography
            sx={{ fontSize: { md: "25px", xs: "17px" }, color: "#4B66A2" }}
          >
            Tìm theo:
          </Typography>
          <CustomizedAccordions slug={slug} handleClose={handleClose} />
        </FilterBox>
      </Box>
    </Box>
  );
}

export default Filter;
