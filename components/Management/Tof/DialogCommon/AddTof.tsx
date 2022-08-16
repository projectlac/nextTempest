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
import { TAG_TYPE } from "../../../../types/account";
import TinyEditor from "../../../Common/Editor/TinyEditor";
import CharacterList from "./Feature/CharacterList";
import ServerList from "./Feature/ServerList";
import WeaponList from "./Feature/WeaponList";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTof() {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();

  const [open, setOpen] = React.useState<boolean>(false);
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fileList, setFileList] = React.useState<FileList>();
  const [fileListCurreny, setFileListCurreny] = React.useState<string[]>();
  const [listData, setListData] = React.useState([]); // Loading đầu game để lấy dữ liệu cho form

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

    ar: yup.number().required("Thông tin này là bắt buộc"),
    character: yup
      .array()
      .min(1, "Thông tin này là bắt buộc")
      .nullable()
      .required("Thông tin này là bắt buộc"),
    server: yup.string().required("Thông tin này là bắt buộc"),
    primogems: yup.number().required("Thông tin này là bắt buộc"),
    newPrice: yup.number().required("Thông tin này là bắt buộc"),
    accountId: yup.string().required("Thông tin này là bắt buộc"),
    tinhhuy: yup.number().required("Thông tin này là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      weapon: ["Đang Cập Nhật"],
      character: [],
      server: "",
      body: "",
      ar: 0,
      primogems: 0,
      tinhhuy: 0,
      accountId: "",
      moonPack: 0,
      oldPrice: 0,
      newPrice: 0,
      ortherParamTof: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const {
        title,
        weapon,
        character,
        server,
        body,
        ar,
        primogems,
        tinhhuy,
        accountId,
        moonPack,
        ortherParamTof,

        oldPrice,
        newPrice,
      } = values;
      console.log(values);

      const formData = new FormData();

      formData.append("name", title);
      formData.append("ar", ar.toString());
      formData.append("weapon", "Đang Cập Nhật");
      formData.append("char", character.toString());
      formData.append("code", accountId);
      formData.append("tinhHuy", tinhhuy.toString());
      formData.append("nguyenThach", primogems.toString());
      formData.append("server", server);
      formData.append("oldPrice", oldPrice.toString());
      formData.append("description", body.toString());
      formData.append("newPrice", newPrice.toString());
      formData.append("moonPack", moonPack.toString());
      formData.append("ortherParamTof", ortherParamTof.toString());

      formData.append("game", "tower-of-fantasy");

      for (let i = 0; i < fileList.length; i++) {
        formData.append("files", fileList[i]);
      }

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

  const onEditorChange = (data: string) => {
    formik.handleChange({ target: { name: "body", value: data } });
  };

  const handleSelectedCharacter = (data: string[]) => {
    formik.handleChange({ target: { name: "character", value: data } });
  };

  const handleSelectedServer = (data: string) => {
    formik.handleChange({ target: { name: "server", value: data } });
  };

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
          .getTag({ type: "", game: "tower-of-fantasy" })
          .then((res) => {
            setListData(res.data);
          });
      } catch (error) {}
    };
    getData();
  }, [open]);

  const getNameSortAtoB = (type: string) => {
    return [...listData]
      .filter((d) => d.type === type)
      .sort((a, b) => {
        const nameA = a.title.toUpperCase(); // ignore upper and lowercase
        const nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{ fontFamily: "Montserrat" }}
      >
        Thêm tài khoản
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
          Thêm tài khoản
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
            <CharacterList
              data={getNameSortAtoB(TAG_TYPE.CHARACTER)}
              error={
                formik.touched.character && Boolean(formik.errors.character)
              }
              helper={
                formik.touched.character && (formik.errors.character as string)
              }
              handleSelectedCharacter={handleSelectedCharacter}
              defaultValue={[]}
            />

            <Grid container columnSpacing={2} rowSpacing={2} mt={1}>
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
              <Grid item md={3}>
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
              <Grid item md={3}>
                <TextField
                  fullWidth
                  id="moonPack"
                  label="Thẻ thảng"
                  name="moonPack"
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
                  value={formik.values.moonPack}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.moonPack && Boolean(formik.errors.moonPack)
                  }
                  helperText={formik.touched.moonPack && formik.errors.moonPack}
                />
              </Grid>
              <Grid item md={6}>
                <ServerList
                  error={formik.touched.server && Boolean(formik.errors.server)}
                  helper={
                    formik.touched.server && (formik.errors.server as string)
                  }
                  handleSelectedServer={handleSelectedServer}
                  defaultValue={""}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  fullWidth
                  id="ar"
                  label="Level"
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
                  helperText={formik.touched.ar && formik.errors.ar}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  fullWidth
                  id="primogems"
                  label="Tanium"
                  name="primogems"
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
                  value={formik.values.primogems}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.primogems && Boolean(formik.errors.primogems)
                  }
                  helperText={
                    formik.touched.primogems && formik.errors.primogems
                  }
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  fullWidth
                  id="tinhhuy"
                  label="Gold nucleus"
                  name="tinhhuy"
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
                  value={formik.values.tinhhuy}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.tinhhuy && Boolean(formik.errors.tinhhuy)
                  }
                  helperText={formik.touched.tinhhuy && formik.errors.tinhhuy}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  fullWidth
                  id="ortherParamTof"
                  label="Red nucleus"
                  name="ortherParamTof"
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
                  value={formik.values.ortherParamTof}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.ortherParamTof &&
                    Boolean(formik.errors.ortherParamTof)
                  }
                  helperText={
                    formik.touched.ortherParamTof &&
                    formik.errors.ortherParamTof
                  }
                />
              </Grid>
            </Grid>
            <Typography sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}>
              Chi tiết account
            </Typography>
            <TinyEditor changeBody={onEditorChange} defaultValue="" />

            {/* <Box mt={3}>
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
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFile((e.target as HTMLInputElement).files[0]);
                  }}
                />
              </Button>
            </Box> */}
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
