import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import { useFormik } from "formik";
import Image from "next/image";
import React from "react";
import * as yup from "yup";
import ServerList from "../Feature/ServerList";
import { useAppContext } from "../../../../../../context/state";
import { TAG_TYPE } from "../../../../../../types/account";
import tagApi from "../../../../../../api/tag";
import AutoCompleteHarderForEdit from "../../../../../Common/AutoCompleteHarderForEdit";
import TinyEditor from "../../../../../Common/Editor/TinyEditor";

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
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fileList, setFileList] = React.useState<FileList>();
  const [fileListCurreny, setFileListCurreny] = React.useState<string[]>();
  const [listData, setListData] = React.useState([]);
  const [trigger, setTrigger] = React.useState<boolean>(false);
  const validationSchema = yup.object({
    title: yup
      .string()
      .min(8, "Title should be of minimum 8 characters length")
      .required("Thông tin này là bắt buộc"),
    ar: yup.number().required("Thông tin này là bắt buộc"),
    newPrice: yup.number().required("Thông tin này là bắt buộc"),
    accountId: yup.string().required("Thông tin này là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      title: defaultData.name,
      weapon: defaultData.tags.filter((d) => d.type === TAG_TYPE.WEAPON),
      character: defaultData.tags.filter((d) => d.type === TAG_TYPE.CHARACTER),
      server: defaultData.tags.find((d) => d.type === TAG_TYPE.SERVER)?.title,
      body: defaultData.description,
      ar: defaultData.ar,
      primogems: defaultData.nguyenThach,
      tinhhuy: defaultData.tinhHuy,
      accountId: defaultData.code,
      moonPack: defaultData.moonPack,
      oldPrice: defaultData.oldPrice,
      newPrice: defaultData.newPrice,
      type: defaultData.type,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const {
        title,
        weapon,
        character,
        server,
        type,
        body,
        ar,
        primogems,
        tinhhuy,
        accountId,
        moonPack,
        oldPrice,
        newPrice,
      } = values;
      const formData = new FormData();
      let convertDataCharacter = character.map((d) => d.title);
      let convertDataWeapon = weapon.map((d) => d.title);
      formData.append("name", title);
      formData.append("ar", ar.toString());
      formData.append("weapon", convertDataWeapon.toString());
      formData.append("char", convertDataCharacter.toString());
      formData.append("code", accountId);
      formData.append("tinhHuy", tinhhuy.toString());
      formData.append("nguyenThach", primogems.toString());
      formData.append("server", server);
      formData.append("oldPrice", oldPrice.toString());
      formData.append("description", body.toString());
      formData.append("newPrice", newPrice.toString());
      formData.append("moonPack", moonPack.toString());
      formData.append("type", type);
      formData.append("game", "genshin-impact");

      if (fileList && fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          formData.append("files", fileList[i]);
        }
      }

      setLoading(true);
      tagApi
        .updateAccount(defaultData.id, formData)
        .then((res) => {
          handleChangeMessageToast("Sửa thông tin thành thành công");
          handleChangeStatusToast();
          handleClose();
          updated();
          setTrigger(false);
          setFile(null);
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
    if (open) {
      setFileListCurreny(defaultData.cloundinary);
    }
  }, [defaultData, open]);

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
              helperText={
                formik.touched.title && (formik.errors.title as string)
              }
            />
          </Box>

          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item md={6}>
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
                  formik.touched.accountId &&
                  (formik.errors.accountId as string)
                }
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="ar"
                label="Adventure Rank"
                name="ar"
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
                value={formik.values.ar}
                onChange={formik.handleChange}
                error={formik.touched.ar && Boolean(formik.errors.ar)}
                helperText={formik.touched.ar && (formik.errors.ar as string)}
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
                helperText={
                  formik.touched.oldPrice && (formik.errors.oldPrice as string)
                }
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
                helperText={
                  formik.touched.newPrice && (formik.errors.newPrice as string)
                }
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
                accept="image/*"
                name="fileSlide"
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
  );
}

export default DialogEdit;
