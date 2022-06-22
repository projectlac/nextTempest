/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
const _ = require("lodash");

interface IFindByCode {
  handleChangeCode: (code: string) => void;
}
function FindByCode({ handleChangeCode }: IFindByCode) {
  const [code, setCode] = useState<string>("");
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const removeCode = () => {
    setCode("");
    handleChangeCode("");
  };

  const debounceDropDown = useCallback(
    _.debounce((nextValue: string) => handleChangeCode(nextValue), 300),
    []
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
    debounceDropDown(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, width: "150px" }} variant="outlined">
      <InputLabel
        htmlFor="outlined-adornment-password"
        sx={{
          fontFamily: "Montserrat",
          fontWeight: "bold",
          transform: "translate(14px, 9px) scale(1)",
          "&.Mui-focused": {
            transform: "translate(14px, -9px) scale(0.75)",
          },
          "&.MuiFormLabel-filled": {
            transform: "translate(14px, -9px) scale(0.75)",
          },
        }}
      >
        Tìm mã
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type="text"
        value={code}
        onChange={handleChange}
        sx={{
          height: "40px",
          "& input ": {
            fontFamily: "Montserrat",
          },
        }}
        endAdornment={
          code !== "" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={removeCode}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          )
        }
        label="Tìm mã"
      />
    </FormControl>
  );
}

export default FindByCode;
