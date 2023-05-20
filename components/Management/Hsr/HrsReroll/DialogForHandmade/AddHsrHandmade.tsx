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

import * as React from "react";
import * as yup from "yup";
import tagApi from "../../../../../api/tag";
import { useAppContext } from "../../../../../context/state";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddHsrHandmade() {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const param = {
    game:
      router.pathname.split("/")[2] === "genshin"
        ? "genshin-impact"
        : router.pathname.split("/")[2],
    type: router.pathname.split("/")[3].toUpperCase(),
    name:
      router.pathname.split("/")[2] === "genshin"
        ? "Genshin Impact"
        : "Honkai star rail",
  };

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
      .required("Thông tin này là bắt buộc"),
    newPrice: yup.number().required("Thông tin này là bắt buộc"),
    accountId: yup.string().required("Thông tin này là bắt buộc"),
    image: yup.string().required("Thông tin này là bắt buộc"),
    username: yup.string().required("Thông tin này là bắt buộc"),
    password: yup.string().required("Thông tin này là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      accountId: "",
      oldPrice: 0,
      newPrice: 0,
      image: "",
      username: "",
      password: "",
      type: "RANDOM",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { title, username, password, accountId, newPrice, image } = values;
      setLoading(true);
      tagApi
        .addOneRerollAccount({
          name: title,
          title: title,
          username: username,
          password: password,
          cost: newPrice,
          code: accountId,
          type: param.type,
          image: image,
          gameSlug: param.game,
        })
        .then((res) => {
          handleChangeMessageToast("Tạo tài khoản thành thành công");
          handleChangeStatusToast();
          handleClose();
          updated();
          resetForm();
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
        Đăng thủ công
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
          Thêm tài khoản {param.name} {param.type}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box mb={3}>
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

            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  id="username"
                  label="Tài khoản"
                  name="username"
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
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  id="password"
                  label="Mật khẩu"
                  name="password"
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  id="accountId"
                  label="Mã Account"
                  name="accountId"
                  type="text"
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
                  value={formik.values.accountId}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.accountId && Boolean(formik.errors.accountId)
                  }
                  helperText={
                    formik.touched.accountId && formik.errors.accountId
                  }
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  id="newPrice"
                  label="Giá"
                  name="newPrice"
                  type="number"
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
                  value={formik.values.newPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.newPrice && Boolean(formik.errors.newPrice)
                  }
                  helperText={formik.touched.newPrice && formik.errors.newPrice}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  id="image"
                  label="Link ảnh"
                  name="image"
                  type="text"
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
                />
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
