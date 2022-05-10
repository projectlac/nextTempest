import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import TinyEditor from "../../../Common/Editor/TinyEditor";
import * as yup from "yup";
import { useFormik } from "formik";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddNews() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    title: yup
      .string()
      .min(8, "Title should be of minimum 8 characters length")
      .required("Email is required"),
    description: yup
      .string()
      .min(8, "Description should be of minimum 8 characters length")
      .required("Password is required"),
    file: yup.mixed().required(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      body: "",
      file: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("sdasds");

      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{ fontFamily: "Montserrat" }}
      >
        Thêm tin tức
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
          Thêm tin tức
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box mt={3}>
              <TextField
                fullWidth
                id="title"
                label="Tiêu đề"
                name="title"
                variant="outlined"
                sx={{
                  "& label": {
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                  },
                  "& input": {
                    fontFamily: "Montserrat",
                  },
                }}
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Box>
            <Box mt={3} mb={3}>
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Mô tả"
                name="description"
                variant="outlined"
                sx={{
                  "& label": {
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                  },
                  "& input": {
                    fontFamily: "Montserrat",
                  },
                }}
              />
            </Box>

            <TinyEditor />

            <Box mt={3}>
              <Typography sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}>
                Ảnh chính
              </Typography>
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  accept=".jpg, .png"
                  name="file"
                  required
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
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
              Xác nhận
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
