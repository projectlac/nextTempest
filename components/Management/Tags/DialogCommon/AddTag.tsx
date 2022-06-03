import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
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
import * as React from "react";
import * as yup from "yup";
import newsApi from "../../../../api/newsApi";
import tagApi from "../../../../api/tag";
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

export default function AddTag() {
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

  const validationSchema = yup.object({
    title: yup.string().required("Vui lòng điền tên"),
    tag: yup.string().required("Xin hãy chọn tag"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      tag: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { title, tag } = values;

      setLoading(true);
      tagApi
        .addTag({ content: {}, title, type: tag })
        .then((res) => {
          handleChangeMessageToast("Tạo tag mới thành công");
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
        Thêm Tag
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
          Thêm Tag
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
            <Box>
              <Box mt={1}>Loại tag</Box>
              <Box>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="tag"
                    onChange={formik.handleChange}

                    // onChange={handleChoose}
                  >
                    <FormControlLabel
                      value="SERVER"
                      control={<Radio />}
                      sx={{
                        "& span": {
                          fontFamily: "Montserrat",
                        },
                      }}
                      label="Server"
                    />
                    <FormControlLabel
                      value="CHARACTER"
                      control={<Radio />}
                      sx={{
                        "& span": {
                          fontFamily: "Montserrat",
                        },
                      }}
                      label="Character"
                    />
                    <FormControlLabel
                      value="WEAPON"
                      control={<Radio />}
                      sx={{
                        "& span": {
                          fontFamily: "Montserrat",
                        },
                      }}
                      label="Weapon"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
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
