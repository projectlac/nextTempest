import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface PrireFilter {
  handleSortByPrice: (data: string) => void;
}
export default function PrireFilter({ handleSortByPrice }: PrireFilter) {
  const [age, setAge] = React.useState<string>("all");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    if (event.target.value === "-1") {
      handleSortByPrice(null);
    } else {
      handleSortByPrice(event.target.value);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: { md: 120, xs: "44%" } }} size="small">
      <InputLabel
        id="demo-select-small"
        sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
      >
        Khoảng giá
      </InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        defaultValue=""
        label="Khoảng giá"
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
          value={"all"}
        >
          Tất cả
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={"0 - 2000000"}
        >
          Dưới 2 triệu
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={"2000000 - 4000000"}
        >
          2 triệu - 4 triệu
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={"4000000 - 6000000"}
        >
          4 triệu - 6 triệu
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={"6000000 - 8000000"}
        >
          6 triệu - 8 triệu
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={"8000000 - 10000000"}
        >
          8 triệu - 10 triệu
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={"10000000"}
        >
          Trên 10 triệu
        </MenuItem>
      </Select>
    </FormControl>
  );
}
