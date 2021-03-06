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
import TinyEditor from "../../../Common/Editor/TinyEditor";
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
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { title, description, body } = values;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", body);
      formData.append("file", file);

      setLoading(true);
      newsApi
        .add(formData)
        .then((res) => {
          handleChangeMessageToast("T???o b??i vi???t th??nh c??ng");
          handleChangeStatusToast();
          handleClose();
          updated();
          resetForm();
          setFile(null);
        })
        .catch(() => {
          handleChangeMessageToast("C?? l???i x???y ra");
          handleChangeStatusToast();
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const onEditorChange = (data: string) => {
    formik.handleChange({ target: { name: "body", value: data } });
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{ fontFamily: "Montserrat" }}
      >
        Th??m tin t???c
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
          Th??m tin t???c
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box>
              <TextField
                fullWidth
                id="title"
                label="Ti??u ?????"
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
                label="M?? t???"
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

            <TinyEditor changeBody={onEditorChange} defaultValue="" />

            <Box mt={3}>
              <Typography sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}>
                ???nh ch??nh
              </Typography>
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  accept=".jpg, .png"
                  name="file"
                  required
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFile((e.target as HTMLInputElement).files[0]);
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
              {loading ? (
                <CircularProgress sx={{ color: "#fff" }} size={24} />
              ) : (
                "X??c nh???n"
              )}
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
              ????ng
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
