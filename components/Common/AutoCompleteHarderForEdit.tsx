import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface IAutocomplete {
  data: any;
  name: string;
  title: string;
  formik: any;
  handleSelected: (data: any) => void;
  defaultValue: any;
  id: string;
  trigger: boolean;
}
interface IData {
  title: string;
  slug: string;
}
function AutoCompleteHarderForEdit({
  data,
  title,
  name,
  trigger,
  handleSelected,
  formik,
  defaultValue,
  id,
}: IAutocomplete) {
  const [inputValueHero, setInputValueHero] = useState<IData[]>([]);

  useEffect(() => {
    setInputValueHero(defaultValue);
  }, [data, trigger]);
  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={data}
      value={inputValueHero}
      isOptionEqualToValue={(option, value) => {
        return option.title === value.title;
      }}
      onChange={(event: any, newValue: any) => {
        handleSelected(newValue);
      }}
      getOptionLabel={(option: IData) => option.title}
      defaultValue={[]}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={title} placeholder="Tìm và chọn" />
      )}
    />
  );
}

export default AutoCompleteHarderForEdit;
