import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import * as React from "react";
import tagApi from "../../../../api/tag";
import DialogEdit from "./DialogEdit/DialogEdit";

interface PropsEditNews {
  id: string;
}
export default function EditTag({ id }: PropsEditNews) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [defaultData, setDefaultData] = React.useState({
    title: "",
    type: "",
    id: "",
  });

  const callApi = async () => {
    try {
      await tagApi.getTagById(id).then((res) => {
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
