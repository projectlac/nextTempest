import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TinyEditor from "../../../../Common/Editor/TinyEditor";
import * as yup from "yup";

import { useAppContext } from "../../../../../context/state";
import { Formik, useFormik } from "formik";
import newsApi from "../../../../../api/newsApi";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";

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
      imageUrl: yup.mixed(),
    });
  const formik = useFormik({
    initialValues: {
      id: defaultData.id,
      title: defaultData.title,
      description: defaultData.description,
      content: defaultData.content,
      keyword: defaultData.keyword,
      imageUrl: defaultData.imageUrl,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { title, description, content, id, keyword } = values;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("keyword", keyword);

      if (file) {
        formData.append("file", file);
      }

      setLoading(true);
      newsApi
        .editNews(formData, id)
        .then((res) => {
          handleChangeMessageToast("Sửa bài viết thành công");
          updated();
          handleChangeStatusToast();
          handleClose();
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
    formik.handleChange({ target: { name: "content", value: data } });
  };

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
        Chỉnh sửa tin tức
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
            />
          </Box>
          <Box mt={3} mb={3}>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Mô tả"
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
                formik.touched.description && Boolean(formik.errors.description)
              }
            />
          </Box>

          <TinyEditor
            changeBody={onEditorChange}
            defaultValue={defaultData.content}
          />
          <Box mt={3}>
            <Typography sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}>
              Ảnh chính
            </Typography>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                accept=".jpg, .png"
                name="imageUrl"
                onChange={(e) => {
                  formik.handleChange(e);
                  setFile((e.target as HTMLInputElement).files[0]);
                }}
              />
            </Button>
            {defaultData.imageUrl && (
              <Box width={200} height={200} position="relative" mt={2}>
                <Image
                  alt=""
                  src={defaultData.imageUrl}
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
            )}
          </Box>
          <Box mt={3} mb={3}>
            <TextField
              fullWidth={true}
              id="outlined-basic"
              label="Từ khóa SEO"
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
              value={formik.values.keyword}
              onChange={formik.handleChange}
              error={formik.touched.keyword && Boolean(formik.errors.keyword)}
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
