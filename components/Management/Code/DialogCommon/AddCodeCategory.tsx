import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
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
import codeApi from "../../../../api/codeApi";
import { useAppContext } from "../../../../context/state";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCodeCategory() {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fileList, setFileList] = React.useState<FileList>();
  const [fileListCurreny, setFileListCurreny] = React.useState<string[]>();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    name: yup.string().required("Vui lòng điền tên"),
    price: yup.number().min(0).required("Xin hãy điền đúng giá"),
    gameSlug: yup.string().required("Vui lòng điền game"),
    image: yup.string().required("Vui lòng điền ảnh"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      image: "",
      gameSlug: "honkai-star-rail",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { name, price, image, gameSlug } = values;

      setLoading(true);
      codeApi
        .createCodeCategory({ name, price, gameSlug, image })
        .then((res) => {
          handleChangeMessageToast("Tạo danh mục code thành công");
          handleChangeStatusToast();
          handleClose();
          updated();
          resetForm();
          setFile(null);
          (
            document.getElementById(
              "change-cover-create-code-new"
            ) as HTMLInputElement
          ).value = "";
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

  const uploadMultiFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileObj = [];
    let fileArray = [];

    fileObj.push(e.target.files);

    setFileList(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    formik.handleChange({ target: { name: "file", value: e.target.files } });
    setFileListCurreny(fileArray);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{ fontFamily: "Montserrat" }}
      >
        Tạo danh mục
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
          Thêm danh mục Code
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                id="name"
                label="Tên"
                name="name"
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
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Box>
            <Grid container columnSpacing={2}>
              <Grid item md={4}>
                <Box>
                  <TextField
                    fullWidth
                    id="price"
                    label="Giá"
                    name="price"
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
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box>
                  <TextField
                    fullWidth
                    select
                    id="gameSlug"
                    label="Chọn game"
                    name="gameSlug"
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
                    value={formik.values.gameSlug}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.gameSlug && Boolean(formik.errors.gameSlug)
                    }
                    helperText={
                      formik.touched.gameSlug && formik.errors.gameSlug
                    }
                  >
                    <MenuItem value="honkai-star-rail">
                      Honkai Star Rail
                    </MenuItem>
                    <MenuItem value="genshin-impact">Genshin Impact</MenuItem>
                    <MenuItem value="wuthering-waves">Wuthering Waves</MenuItem>
                  </TextField>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box>
                  <TextField
                    fullWidth
                    id="image"
                    label="Link ảnh"
                    name="image"
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
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                  ></TextField>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              padding: "15px",
              "& button": {
                fontFamily: "Montserrat",
              },
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                console.log(formik.errors);
              }}
            >
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
