import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import * as React from "react";
import DialogEdit from "../DialogEdit/DialogEdit";
import tagApi from "../../../../../api/tag";

interface PropsEditNews {
  id: string;
}
export default function EditWw({ id }: PropsEditNews) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [defaultData, setDefaultData] = React.useState({
    code: "",
    cost: 0,
    id: "",
    image: "",
    name: "",
    slug: "",
  });

  const callApi = async () => {
    try {
      await tagApi.getOneRerollAccountById(id).then((res) => {
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
