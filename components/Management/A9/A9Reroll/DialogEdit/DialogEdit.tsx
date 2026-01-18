import { Box, CircularProgress, Slide, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import tagApi from "../../../../../api/tag";
import { useAppContext } from "../../../../../context/state";
import { useRouter } from "next/router";

interface PropsDialogEdit {
  handleClose: () => void;
  open: boolean;
  defaultData: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogEdit({ handleClose, open, defaultData }: PropsDialogEdit) {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(8, "Title should be of minimum 8 characters length")
      .required("Thông tin này là bắt buộc"),
    cost: yup.number().required("Thông tin này là bắt buộc"),
    image: yup.string().required("Thông tin này là bắt buộc"),
    code: yup.string().required("Thông tin này là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      name: defaultData.name,
      code: defaultData.code,
      cost: defaultData.cost,
      image: defaultData.image,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { name, code, cost, image } = values;
      setLoading(true);
      tagApi
        .editOneRerollAccount(defaultData.slug, { name, code, cost, image })
        .then((res) => {
          handleChangeMessageToast("Sửa thông tin thành thành công");
          handleChangeStatusToast();
          handleClose();
          updated();
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
        Chỉnh sửa thông tin tài khoản
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box mb={3}>
            <TextField
              fullWidth
              id="name"
              label="Tiêu đề"
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
              helperText={formik.touched.name && (formik.errors.name as string)}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              id="code"
              label="Mã account"
              name="code"
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
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && (formik.errors.code as string)}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              id="cost"
              label="Giá"
              name="cost"
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
              value={formik.values.cost}
              onChange={formik.handleChange}
              error={formik.touched.cost && Boolean(formik.errors.cost)}
              helperText={formik.touched.cost && (formik.errors.cost as string)}
            />
          </Box>
          <Box mb={3}>
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
              helperText={
                formik.touched.image && (formik.errors.image as string)
              }
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
  );
}

export default DialogEdit;
