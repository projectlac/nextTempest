import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import newsApi from "../../../../api/newsApi";
import tagApi from "../../../../api/tag";
import DialogEdit from "./DialogEdit/DialogEdit";

interface PropsEditNews {
  id: string;
}
export default function EditTof({ id }: PropsEditNews) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [defaultData, setDefaultData] = React.useState({
    ar: 0,
    code: "",
    tinhHuy: 0,
    moonPack: 0,
    nguyenThach: 0,
    char: "",
    weapon: "",
    server: "",
    name: "",
    oldPrice: 0,
    newPrice: 0,
    description: "",
    id: "",
    tags: [],
    cloundinary: [],
    game: "tower-of-fantasy",
    ortherParamTof: 0,
  });
  // Loading đầu game để lấy dữ liệu cho form

  const callApi = async () => {
    try {
      await tagApi.getAccountById(id).then((res) => {
        setDefaultData(res.data);
      });
    } catch (error) {}
  };
  const handleClickOpen = async () => {
    setOpen(true);
    await callApi();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <EditTwoToneIcon fontSize="small" onClick={handleClickOpen} />
      <DialogEdit
        defaultData={defaultData}
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
}
