import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SortOption {
  handleSortBy: (data: number) => void;
}
export default function SortOption({ handleSortBy }: SortOption) {
  const [age, setAge] = React.useState<string>("-1");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    if (event.target.value === "-1") {
      handleSortBy(null);
    } else {
      handleSortBy(+event.target.value);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel
        id="demo-select-small"
        sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
      >
        Sắp xếp
      </InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        defaultValue=""
        label="Sắp xếp"
        onChange={handleChange}
        displayEmpty={true}
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
          value={"-1"}
        >
          Mới nhất
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={2}
        >
          Đang sale
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={0}
        >
          Giá thấp tới cao
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={1}
        >
          Giá cao tới thấp
        </MenuItem>
      </Select>
    </FormControl>
  );
}
