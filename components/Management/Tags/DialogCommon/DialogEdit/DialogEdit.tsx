import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
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
import tagApi from "../../../../../api/tag";

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

  const validationSchema = yup.object({
    title: yup.string().required("Vui lòng điền tên"),
    tag: yup.string().required("Xin hãy chọn tag"),
  });

  const formik = useFormik({
    initialValues: {
      id: defaultData.id,
      title: defaultData.title,
      tag: defaultData.type,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { title, tag, id } = values;

      setLoading(true);
      tagApi
        .updateTag(id, { title, type: tag, content: {} })
        .then((res) => {
          handleChangeMessageToast("Sửa tag thành công");
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
        Chỉnh sửa tag
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

          <Box>
            <Box mt={1}>Loại tag</Box>
            <Box>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="tag"
                  onChange={formik.handleChange}
                  value={formik.values.tag}
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
  );
}

export default DialogEdit;
