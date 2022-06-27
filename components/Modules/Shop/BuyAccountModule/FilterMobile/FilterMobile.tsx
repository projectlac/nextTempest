import { Box } from "@mui/material";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
function FilterMobile() {
  return (
    <Box
      sx={{
        height: {
          sm: "55px",
          xs: "50px",
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
  );
}

export default FilterMobile;
