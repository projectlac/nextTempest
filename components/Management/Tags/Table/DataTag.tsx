import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import tagApi from "../../../../api/tag";
import { useAppContext } from "../../../../context/state";
import TableTag from "./TableTag";
function DataTag() {
  const [cryptoOrders, setCryptoOrders] = useState([]);
  const [limitPage, setLimitPage] = useState<number>(10);
  const [offsetPage, setOffsetPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [gameList, setGameList] = useState<any>();
  const [gameSelected, setGameSelected] = useState<string>("genshin-impact");
  const { update } = useAppContext();

  const handleChangeLimit = (data: number) => {
    setLimitPage(data);
  };
  const handleChangePage = (data: number) => {
    setOffsetPage(data);
  };

  useEffect(() => {
    tagApi.getTag({ type: "", game: gameSelected }).then((res) => {
      setCryptoOrders(res.data);
      let total = res.data.length;
      setTotal(total);
    });
    tagApi.getGame().then((res) => {
      setGameList(res.data);
    });
  }, [update, limitPage, gameSelected]);
  const handleChange = (event) => {
    setGameSelected(event.target.value);
  };

  return (
    <Card>
      <Box width="250px" my={3} mx={1} sx={{ marginLeft: "auto" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Game</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gameSelected}
            label="Game"
            onChange={handleChange}
          >
            {gameList &&
              gameList.map((d) => (
                <MenuItem value={d.slug} key={d.id}>
                  {d.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <TableTag
        gameSelected={gameSelected}
        cryptoOrders={cryptoOrders}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        total={total}
      />
    </Card>
  );
}

export default DataTag;
