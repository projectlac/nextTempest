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
import tagApi from "../../../../api/tag";
import { useAppContext } from "../../../../context/state";
import { TAG_TYPE } from "../../../../types/account";
import AutoCompleteHarder from "../../../Common/AutoCompleteHarder";
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

    ar: yup.number().required("Thông tin này là bắt buộc"),
    weapon: yup
      .array()
      .min(1, "Thông tin này là bắt buộc")
      .nullable()
      .required("Thông tin này là bắt buộc"),
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
      weapon: [],
      character: [],
      server: "Asia",
      body: "",
      ar: 0,
      primogems: 0,
      tinhhuy: 0,
      accountId: "",
      moonPack: 0,
      oldPrice: 0,
      newPrice: 0,
      username: "",
      password: "",
      type: "VIP",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const {
        title,
        weapon,
        character,
        server,
        username,
        password,
        body,
        ar,
        primogems,
        tinhhuy,
        accountId,
        moonPack,
        oldPrice,
        newPrice,
        type,
      } = values;

      let convertDataCharacter = character.map((d) => d.title);
      let convertDataWeapon = weapon.map((d) => d.title);

      const formData = new FormData();

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
      formData.append("tofUsername", username);
      formData.append("tofPassword", password);
      formData.append("type", type);
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

  const onEditorChange = (data: string) => {
    formik.handleChange({ target: { name: "body", value: data } });
  };

  const handleSelectedCharacter = (data: string[]) => {
    formik.handleChange({ target: { name: "character", value: data } });
  };

  const handleSelectedWeapon = (data: string[]) => {
    formik.handleChange({ target: { name: "weapon", value: data } });
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
          .getTag({ type: "", game: "honkai-star-rail" })
          .then((res) => {
            setListData(res.data);
          });
      } catch (error) {}
    };
    getData();
    setTrigger(true);
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
            <Box mb={3}>
              <AutoCompleteHarder
                trigger={trigger}
                title="Danh sách nhân vật"
                data={getNameSortAtoB(TAG_TYPE.CHARACTER)}
                id="create-vip-character"
                name="character"
                formik={formik}
                handleSelected={handleSelectedCharacter}
                defaultValue={[]}
              />
            </Box>
            <Box mb={3}>
              <AutoCompleteHarder
                trigger={trigger}
                title="Danh sách vũ khí"
                data={getNameSortAtoB(TAG_TYPE.WEAPON)}
                id="create-vip-character"
                name="weapon"
                formik={formik}
                handleSelected={handleSelectedWeapon}
                defaultValue={[]}
              />
            </Box>

            {/* 
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
            <WeaponList
              data={getNameSortAtoB(TAG_TYPE.WEAPON)}
              error={formik.touched.weapon && Boolean(formik.errors.weapon)}
              helper={formik.touched.weapon && (formik.errors.weapon as string)}
              handleSelectedWeapon={handleSelectedWeapon}
              defaultValue={[]}
            /> */}

            <Grid container columnSpacing={2} rowSpacing={2}>
              <Grid item md={5}>
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
              <Grid item md={5}>
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
              <Grid item md={2}>
                <TextField
                  select
                  fullWidth
                  id="type"
                  label="Loại acc"
                  name="type"
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
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                >
                  <MenuItem value="VIP">Mặc định</MenuItem>
                  <MenuItem value="NEW">Acc khởi đầu</MenuItem>
                </TextField>
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
                    formik.touched.accountId && formik.errors.accountId
                  }
                />
              </Grid>
              <Grid item md={6}>
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
                  defaultValue={"Asia"}
                  open={open}
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
                  helperText={formik.touched.ar && formik.errors.ar}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  id="primogems"
                  label="Nguyên thạch"
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
              <Grid item md={6}>
                <TextField
                  fullWidth
                  id="tinhhuy"
                  label="Tinh huy"
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
                  accept="image/*"
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
                  // accept="image/*"
                  accept="image/*"
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
