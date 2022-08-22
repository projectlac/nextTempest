import { useState, useRef } from "react";

import {
  Box,
  Menu,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: red;
     color: #fff;

     &:hover {
        background: red;
     }
    `
);
interface IBulk {
  selectedCryptoOrders: string[];
}
function BulkActions({ selectedCryptoOrders }: IBulk) {
  const deleteAll = () => {
    console.log(selectedCryptoOrders);
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography color="text.secondary">Xóa 10 tài khoản</Typography>
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={deleteAll}
          >
            Delete
          </ButtonError>
        </Box>
      </Box>
    </>
  );
}

export default BulkActions;
