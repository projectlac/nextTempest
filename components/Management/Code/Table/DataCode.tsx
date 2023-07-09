import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import tagApi from "../../../../api/tag";
import { useAppContext } from "../../../../context/state";
import TableTag from "./TableTag";
import AddCodeCategory from "../DialogCommon/AddCodeCategory";
import EditCodeCategory from "../DialogCommon/EditCodeCategory";
import codeApi from "../../../../api/codeApi";
import DeleteCodeCategory from "../DialogCommon/DeleteCodeCategory";
import AddTag from "../DialogCommon/AddTag";
import { ICodeCategoryDetail } from "../../../../types/code";
function DataCode() {
  const [cryptoOrders, setCryptoOrders] = useState([]);

  const [total, setTotal] = useState<number>(0);
  const [codeList, setCodeList] = useState<ICodeCategoryDetail[]>([]);
  const [nameOfCode, setNameOfCode] = useState<string>("");
  const [codeSelected, setCodeSelected] = useState<string>("");
  const { update } = useAppContext();

  const renderIdAndName = useMemo(() => {
    const currentSelected = codeList.filter(
      (d) => d.slug === codeSelected
    )?.[0];
    return { id: currentSelected?.id, name: currentSelected?.name };
  }, [codeList, codeSelected]);

  useEffect(() => {
    codeApi.getCodeBySlugAdmin(codeSelected).then((res) => {
      setCryptoOrders(res.data.codes);
      let total = res.data.codes?.length;
      setNameOfCode(res.data.name);
      setTotal(total);
    });
  }, [codeSelected, renderIdAndName]);
  useEffect(() => {
    codeApi.getCodeAdmin(9999, 0).then((res) => {
      setCodeSelected(res.data.data?.[0]?.slug);
      setCodeList(res.data.data);
    });
  }, [update]);
  const handleChange = (event) => {
    setCodeSelected(event.target.value);
  };

  return (
    <Card>
      <Box
        width="800px"
        my={3}
        mx={1}
        sx={{
          marginLeft: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ width: "250px" }}>
          <InputLabel id="demo-simple-select-label">Chọn danh mục</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={codeSelected}
            label="Chọn danh mục"
            onChange={handleChange}
          >
            {codeList &&
              codeList.map((d) => (
                <MenuItem value={d.slug} key={d.id}>
                  {d.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <AddCodeCategory />
        <EditCodeCategory slug={codeSelected} />
        {cryptoOrders?.length === 0 && (
          <DeleteCodeCategory slug={codeSelected} />
        )}
        |
        {codeList.length > 0 && (
          <AddTag id={renderIdAndName?.id} name={renderIdAndName?.name} />
        )}
      </Box>

      <TableTag
        cryptoOrders={cryptoOrders}
        nameOfCode={nameOfCode}
        total={total}
      />
    </Card>
  );
}

export default DataCode;
