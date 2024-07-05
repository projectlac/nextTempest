import { Box, CircularProgress } from "@mui/material";
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

interface ITagProp {
  id: string;
  name: string;
}
export default function AddTag({ id, name }: ITagProp) {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  // const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState<boolean>(false);

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

      setLoading(true);
      const formData = new FormData();
      formData.append("giftCodeId", id);
      formData.append("file", file);

      codeApi
        .importCode(formData)
        .then((res) => {
          handleChangeMessageToast("Nhập code thành công");
          handleChangeStatusToast();
          handleClose();
          updated();
          (
            document.getElementById("uploadCode-import") as HTMLInputElement
          ).value = "";

          resetForm();
        })
        .catch((err) => {
          if (err.response.data.message.includes("duplicate"))
            handleChangeMessageToast(
              "Có code đã tồn tại, vui lòng kiểm tra lại"
            );
          else {
            handleChangeMessageToast("Có lỗi xảy ra");
          }
          handleChangeStatusToast();
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectedFile(e.target.files[0]);
  };
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
        Nhập code
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
          Nhập code cho danh mục <b>{name} </b>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContent>
              <Box>
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    accept=".xlsx"
                    name="file"
                    required
                    id="uploadCode-import"
                    type="file"
                    onChange={uploadFile}
                  />
                </Button>
              </Box>
            </DialogContent>
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
