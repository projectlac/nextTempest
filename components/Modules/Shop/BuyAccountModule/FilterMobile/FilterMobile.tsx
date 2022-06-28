import { Box, styled } from "@mui/material";
import React, { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Filter from "../Filter";

const Overlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  background: "#000000c4",
  zIndex: "1",
}));

function FilterMobile() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const open = () => {
    setOpenFilter(true);
  };
  const close = () => {
    setOpenFilter(false);
  };
  return (
    <Box>
      <Box
        onClick={open}
        sx={{
          height: {
            sm: "55px",
            xs: "50px",
          },
          fontSize: {
            md: "16px",
            xs: "14px",
          },
          borderRadius: "50px",
          border: "#C4CEE2 1px solid",
          background: "#FFFFFF",
          marginBottom: "30px",
          marginTop: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 15px",
        }}
      >
        Tìm theo <ChevronRightIcon />
      </Box>
      {openFilter && (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            width: "100%",
          }}
        >
          <Overlay onClick={close} />
          <Filter />
        </Box>
      )}
    </Box>
  );
}

export default FilterMobile;
