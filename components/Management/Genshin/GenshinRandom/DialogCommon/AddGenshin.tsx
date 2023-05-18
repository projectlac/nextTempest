import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useFormik } from "formik";
import Image from "next/image";
import * as React from "react";
import * as yup from "yup";
import tagApi from "../../../../../api/tag";
import { useAppContext } from "../../../../../context/state";
import { TAG_TYPE } from "../../../../../types/account";
import TinyEditor from "../../../../Common/Editor/TinyEditor";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddGenshin() {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  // const [characterList, setCharacterList] = React.useState<string[]>([]);

  //
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
    handleSelectedFile(e.target.files[0]);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object().shape({
    file: yup.mixed().required("File is required"),
  });

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { file } = values;
      const formData = new FormData();

      formData.append("file", file);

      setLoading(true);
      console.log(values);

      tagApi
        .addRerollAccount(formData)
        .then((res) => {
          handleChangeMessageToast("Cập nhật danh sách thành công");
          handleChangeStatusToast();
          handleClose();
          updated();
          resetForm();
          setFile(null);
        })
        .catch(() => {
          handleChangeMessageToast("Có lỗi xảy ra");
          handleChangeStatusToast();
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  const handleSelectedFile = (file: File) => {
    formik.handleChange({ target: { name: "file", value: file } });
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{ fontFamily: "Montserrat" }}
      >
        Thêm tài khoản bằng xlsx
      </Button>

      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontFamily: "Montserrat",
          }}
        >
          Thêm tài khoản bằng xlsx
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box>
              <Button variant="contained" component="label">
                Upload File
                <input
                  accept=".xlsx"
                  name="file"
                  required
                  type="file"
                  onChange={uploadFile}
                />
              </Button>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              padding: "15px",
              "& button": {
                fontFamily: "Montserrat",
              },
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              {loading ? (
                <CircularProgress sx={{ color: "#fff" }} size={24} />
              ) : (
                "Xác nhận"
              )}
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
              Đóng
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
