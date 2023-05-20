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
import tagApi from "../../../../api/tag";
import { useAppContext } from "../../../../context/state";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddHsr() {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fileList, setFileList] = React.useState<FileList>();
  const [fileListCurreny, setFileListCurreny] = React.useState<string[]>();
  const [listData, setListData] = React.useState([]); // Loading đầu game để lấy dữ liệu cho form
  const [trigger, setTrigger] = React.useState<boolean>(false);
  //
  // const [characterList, setCharacterList] = React.useState<string[]>([]);

  //

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTrigger(false);
  };

  const validationSchema = yup.object({
    title: yup
      .string()
      .min(8, "Title should be of minimum 8 characters length")
      .required("Thông tin này là bắt buộc"),
    newPrice: yup.number().required("Thông tin này là bắt buộc"),
    accountId: yup.string().required("Thông tin này là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      accountId: "",
      oldPrice: 0,
      newPrice: 0,
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { title, username, password, accountId, oldPrice, newPrice } =
        values;

      const formData = new FormData();

      formData.append("name", title);
      formData.append("ar", "0");
      formData.append("weapon", "Chuyến Tàu Đêm Trên Dải Ngân Hà");
      formData.append("char", "Arlan");
      formData.append("code", accountId);
      formData.append("tinhHuy", "0");
      formData.append("nguyenThach", "0");
      formData.append("server", "ASIA");
      formData.append("oldPrice", oldPrice.toString());
      formData.append("description", "Đây là honkai random");
      formData.append("newPrice", newPrice.toString());
      formData.append("moonPack", "0");
      formData.append("tofUsername", username);
      formData.append("tofPassword", password);
      formData.append("type", "RANDOM");
      formData.append("game", "honkai-star-rail");
      for (let i = 0; i < fileList.length; i++) {
        formData.append("files", fileList[i]);
      }
      // console.log(values);

      setLoading(true);
      tagApi
        .addAccount(formData)
        .then((res) => {
          handleChangeMessageToast("Tạo tài khoản thành thành công");
          handleChangeStatusToast();
          handleClose();
          updated();
          resetForm();
          setFile(null);
          setFileList(null);
          setFileListCurreny(null);
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
    setFileListCurreny(fileArray);
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        await tagApi
          .getTag({ type: "", game: "honkai-star-rail" })
          .then((res) => {
            setListData(res.data);
          });
      } catch (error) {}
    };
    getData();
    setTrigger(true);
  }, [open]);

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        disabled={true}
        sx={{ fontFamily: "Montserrat" }}
      >
        Tạm thời không đăng acc nha
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
          Thêm tài khoản HSR
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
              <Grid item md={4}>
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

              <Grid item md={6}>
                <TextField
                  fullWidth
                  id="oldPrice"
                  label="Giá cũ"
                  name="oldPrice"
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
                  value={formik.values.oldPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.oldPrice && Boolean(formik.errors.oldPrice)
                  }
                  helperText={formik.touched.oldPrice && formik.errors.oldPrice}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  id="newPrice"
                  label="Giá mới"
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
            </Grid>

            <Box mt={3}>
              <Typography sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}>
                Ảnh slide (Tối đa 5 ảnh) 1000x500
              </Typography>
              <Button variant="contained" component="label">
                Upload File
                <input
                  accept=".jpg, .png"
                  name="fileSlide"
                  required
                  type="file"
                  multiple
                  onChange={uploadMultiFile}
                />
              </Button>

              <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
                {(fileListCurreny || []).map((d, index) => (
                  <Box key={index} mx={3}>
                    <Image
                      src={d}
                      alt=""
                      width={300}
                      height={300}
                      objectFit="contain"
                    />
                  </Box>
                ))}
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
