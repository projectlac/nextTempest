import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface FilterByGame {
  handleGame: (data: string) => void;
}
export default function FilterByType({ handleGame }: FilterByGame) {
  const [age, setAge] = React.useState<string>("1");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    handleGame(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: { md: 120, xs: "44%" } }} size="small">
      <InputLabel
        id="demo-select-small"
        sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
      >
        Chọn loại Acc
      </InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        defaultValue=""
        label="Chọn loại Acc"
        onChange={handleChange}
        sx={{
          fontFamily: "Montserrat",
          background: "#fff",
          fontSize: {
            md: "16px",
            xs: "14px",
          },
          height: "40px",
        }}
      >
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={"1"}
        >
          Loại 1
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={"2"}
        >
          Loại 2
        </MenuItem>
      </Select>
    </FormControl>
  );
}
