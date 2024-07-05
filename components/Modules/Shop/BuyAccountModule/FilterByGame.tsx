import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GAME } from "../../../../utility/constain";

interface FilterByGame {
  handleGame: (data: string) => void;
}
export default function FilterByGame({ handleGame }: FilterByGame) {
  const [age, setAge] = React.useState<string>("genshin-impact");

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
        Chọn game
      </InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        defaultValue=""
        label="Chọn game"
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
          value={"genshin-impact"}
        >
          Genshin Impact
        </MenuItem>

        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={"honkai-star-rail"}
        >
          Honkai star rail
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={"wuthering-waves"}
        >
          Wuthering Waves
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Montserrat",
            fontSize: {
              md: "16px",
              xs: "13px",
            },
          }}
          value={GAME.ZZZ}
        >
          Zenless Zone Zero
        </MenuItem>
      </Select>
    </FormControl>
  );
}
