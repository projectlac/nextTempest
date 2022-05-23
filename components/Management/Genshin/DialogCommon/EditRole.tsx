import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import WarningSubmit from "./WarningSubmit";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditRole() {
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState<string>("User");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <div>
      <EditTwoToneIcon fontSize="small" onClick={handleClickOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth={true}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontFamily: "Montserrat",
          }}
        >
          Chỉnh sửa quyền của tài khoản này
        </DialogTitle>
        <DialogContent>
          <Box textAlign={"center"} width={250} sx={{ margin: " 24px auto 0" }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Chọn role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Chọn role"
                onChange={handleChange}
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                <MenuItem
                  value={"User"}
                  sx={{
                    fontFamily: "Montserrat",
                  }}
                >
                  User
                </MenuItem>
                <MenuItem
                  value={"Mod"}
                  sx={{
                    fontFamily: "Montserrat",
                  }}
                >
                  Cộng tác viên
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "15px",
          }}
        >
          <WarningSubmit cancelDialog={handleClose} status={2} id={"2312"} />
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            sx={{ marginLeft: "15px", fontFamily: "Montserrat" }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
