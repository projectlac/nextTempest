import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import { useAppContext } from "../../../../../../context/state";
import tagApi from "../../../../../../api/tag";

interface ServerListProps {
  error: boolean;
  helper: string;
  handleSelectedServer: (data: string) => void;
  defaultValue: string;
  open: boolean;
}

export default function ServerList({
  error,
  helper,
  handleSelectedServer,
  defaultValue,
  open,
}: ServerListProps) {
  const [age, setAge] = React.useState("");
  const { update } = useAppContext();
  const [listData, setListData] = React.useState([]); // Loading đầu game để lấy dữ liệu cho form

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    handleSelectedServer(event.target.value as string);
  };
  React.useEffect(() => {
    setAge("");
  }, [update]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        await tagApi
          .getTag({ type: "SERVER", game: "genshin-impact" })
          .then((res) => {
            setListData(res.data);
          });
      } catch (error) {}
    };
    if (open) {
      getData();
    }
  }, [open]);

  React.useEffect(() => {
    if (defaultValue) setAge(defaultValue);
  }, [defaultValue]);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        sx={{
          "& label": {
            fontFamily: "Montserrat",
            fontWeight: "bold",
          },
          "& input": {
            fontFamily: "Montserrat",
          },
        }}
      >
        <InputLabel
          id="demo-simple-select-label"
          sx={{ color: `${error ? "#d32f2f" : ""}` }}
        >
          Danh sách Server
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          sx={{
            fontFamily: "Montserrat",
          }}
          name="server"
          label="Danh sách Server"
          onChange={handleChange}
          error={error}
        >
          {listData &&
            listData.map((d) => (
              <MenuItem
                key={d.id}
                sx={{
                  fontFamily: "Montserrat",
                }}
                value={d.title}
              >
                {d.title}
              </MenuItem>
            ))}
          {/* <MenuItem
            sx={{
              fontFamily: "Montserrat",
            }}
            value={"America"}
          >
            America
          </MenuItem>
          <MenuItem
            sx={{
              fontFamily: "Montserrat",
            }}
            value={"Europe"}
          >
            Europe
          </MenuItem>
          <MenuItem
            sx={{
              fontFamily: "Montserrat",
            }}
            value={"TW, HK, MO"}
          >
            TW, HK, MO
          </MenuItem> */}
        </Select>
        {error && (
          <FormHelperText sx={{ color: "#d32f2f" }}>{helper}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
