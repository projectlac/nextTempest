import { Box } from "@mui/material";
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
        alignItems: "flex-end",
        fontSize: {
          lg: 18,
          xs: 15,
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
      {status !== "AVAILABLE" ? "Hết hàng" : "Còn hàng"}
    </Box>
  );
}

export default StatusBox;
