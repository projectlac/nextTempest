import { Box, Typography } from "@mui/material";
import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
interface PropsStatusBox {
  colorStatus: string;
  status: string;
}
function StatusBox({ colorStatus, status }: PropsStatusBox) {
  return (
    <Box
      color={colorStatus}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: {
          lg: "center",
          xs: "center",
        },

        height: "24px",
        fontSize: {
          lg: 18,
          xs: 12,
        },
      }}
    >
      <FiberManualRecordIcon
        sx={{
          marginRight: "10px",
          transform: {
            lg: "scale(1)",
            xs: "scale(0.7)",
          },
        }}
      />{" "}
      <Typography
        component="h6"
        sx={{
          fontSize: {
            lg: 18,
            xs: 12,
          },
        }}
      >
        {status !== "AVAILABLE" ? "Hết hàng" : "Còn hàng"}
      </Typography>
    </Box>
  );
}

export default StatusBox;
