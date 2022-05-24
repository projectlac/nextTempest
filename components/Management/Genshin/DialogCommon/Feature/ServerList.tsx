import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

interface ServerListProps {
  error: boolean;
  helper: string;
  handleSelectedServer: (data: string) => void;
  defaultValue: string;
}
export default function ServerList({
  error,
  helper,
  handleSelectedServer,
  defaultValue,
}: ServerListProps) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    handleSelectedServer(event.target.value as string);
  };

  React.useEffect(() => {
    setAge(defaultValue);
    console.log(defaultValue);
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
          <MenuItem
            sx={{
              fontFamily: "Montserrat",
            }}
            value={"Asia"}
          >
            Asia
          </MenuItem>
          <MenuItem
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
          </MenuItem>
        </Select>
        {error && (
          <FormHelperText sx={{ color: "#d32f2f" }}>{helper}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
