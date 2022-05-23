import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import newsApi from "../../../../api/newsApi";
import DialogEdit from "./DialogEdit/DialogEdit";

interface PropsEditNews {
  id: string;
}
export default function EditGenshin({ id }: PropsEditNews) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [defaultData, setDefaultData] = React.useState({
    id: "",
    title: "",
    description: "",
    content: "",
    imageUrl: null,
  });

  const callApi = async () => {
    try {
      await newsApi.getNewsById(id).then((res) => {
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
