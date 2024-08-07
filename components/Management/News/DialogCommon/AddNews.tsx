import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import newsApi from "../../../../api/newsApi";
import { useAppContext } from "../../../../context/state";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddNews() {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup
    .object({
      title: yup
        .string()
        .min(8, "Title should be of minimum 8 characters length")
        .required("Email is required"),
      description: yup
        .string()
        .min(8, "Description should be of minimum 8 characters length")
        .required("Password is required"),
    })
    .shape({
      file: yup.mixed().required(),
    });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      body: "",
      keyword: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { title, description, body, keyword } = values;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", body);
      formData.append("file", file);
      formData.append("keyword", keyword);

      setLoading(true);
      newsApi
        .add(formData)
        .then((res) => {
          handleChangeMessageToast("Tạo bài viết thành công");
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
            <Box>
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
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Box>

            <TextField
              fullWidth
              id="body"
              label="Mô tả"
              name="body"
              type="text"
              variant="outlined"
              sx={{
                mt: 1,
                "& label": {
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                },
                "& input": {
                  fontFamily: "Montserrat",
                },
              }}
              multiline
              rows={4}
              value={formik.values.body}
              onChange={formik.handleChange}
              error={formik.touched.body && Boolean(formik.errors.body)}
              helperText={formik.touched.body && (formik.errors.body as string)}
            />

            <Box mt={3}>
              <Typography sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}>
                Ảnh chính
              </Typography>
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  required
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFile((e.target as HTMLInputElement).files[0]);
                  }}
                />
              </Button>
            </Box>
            <Box mt={3} mb={3}>
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Từ khóa SEO"
                name="keyword"
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
                value={formik.values.keyword}
                onChange={formik.handleChange}
                error={formik.touched.keyword && Boolean(formik.errors.keyword)}
              />
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
