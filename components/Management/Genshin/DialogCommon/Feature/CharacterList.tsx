import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FormHelperText } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface CharacterProps {
  data: any;
  helper: string;
  error: boolean;
  handleSelectedCharacter: (data: string[]) => void;
}
export default function CharacterList({
  data,
  error,
  helper,
  handleSelectedCharacter,
}: CharacterProps) {
  const theme = useTheme();
  const [names, setNames] = React.useState(data);
  const [personName, setPersonName] = React.useState<string[]>([]);
  React.useEffect(() => {
    setNames(data);
  }, [data]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    handleSelectedCharacter(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
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
          id="demo-multiple-chip-label"
          sx={{ color: `${error ? "#d32f2f" : ""}` }}
        >
          Danh sách nhân vật
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          name="character"
          value={personName}
          fullWidth
          onChange={handleChange}
          error={error}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Danh sách nhân vật"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{ fontFamily: "Montserrat" }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name.id}
              value={name.title}
              style={getStyles(name.title, personName, theme)}
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {name.title}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <FormHelperText sx={{ color: "#d32f2f" }}>{helper}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}