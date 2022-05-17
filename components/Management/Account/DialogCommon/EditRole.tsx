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
import audit from "../../../../api/audit";
import { useAppContext } from "../../../../context/state";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface PropsEditRole {
  username: string;
  roleCurrenly: string;
}
export default function EditRole({ username, roleCurrenly }: PropsEditRole) {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState<string>(roleCurrenly);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  React.useEffect(() => {
    setRole(roleCurrenly);
  }, [roleCurrenly]);
  const handleOnSubmit = async () => {
    try {
      audit.updateRole({ username, role }).then(() => {
        handleChangeMessageToast("Thay đổi quyền thành công");
        updated();
        handleChangeStatusToast();
        handleClose();
      });
    } catch (error) {}
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
                  value={"USER"}
                  sx={{
                    fontFamily: "Montserrat",
                  }}
                >
                  User
                </MenuItem>
                <MenuItem
                  value={"MOD"}
                  sx={{
                    fontFamily: "Montserrat",
                  }}
                >
                  Cộng tác viên
                </MenuItem>
                <MenuItem
                  value={"ADMIN"}
                  sx={{
                    fontFamily: "Montserrat",
                  }}
                >
                  Admin
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
          <WarningSubmit
            cancelDialog={handleClose}
            status={2}
            id={"2312"}
            handleOnSubmit={handleOnSubmit}
          />
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
