/* eslint-disable react-hooks/exhaustive-deps */
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import audit from "../../../api/audit";
import { HISTORY_FILTER } from "../../../utility/enum";

function InfiniteList() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const [userIdFilterTemp, setUserIdFilterTemp] = useState<string>("");
  const [userIdFilter, setUserIdFilter] = useState<string>("");

  const [type, setType] = useState<string>("All");
  const [limit, setLimit] = useState<number>(50);
  const [offset, setOffset] = useState<number>(0);

  const fetchAPIHistory = useCallback(async () => {
    const links = await audit.getHistory({
      limit,
      offset: offset * limit,
      type: type === "All" ? "" : type,
      userIdFilter,
    });
    setItems(links.data.data);
    setTotal(links.data.total);
  }, [limit, offset, type, userIdFilter]);

  const handleChangeType = (e: ChangeEvent<HTMLInputElement>): void => {
    setType(e.target.value);
    setOffset(0);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setOffset(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  useEffect(() => {
    fetchAPIHistory();
  }, [fetchAPIHistory]);

  return (
    <Box>
      <Container>
        <Card
          sx={{
            p: 3,
            mt: 3,
          }}
        >
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Box>Lịch sử thao tác</Box>
            <Box>
              <TextField
                label="Lọc theo userId"
                onChange={(e) => {
                  setUserIdFilterTemp(e.target.value);
                }}
              ></TextField>
              <Button
                variant="contained"
                sx={{ ml: 1, height: "56px" }}
                onClick={() => {
                  setUserIdFilter(userIdFilterTemp);
                }}
              >
                Lọc
              </Button>
            </Box>
            <FormControl fullWidth variant="outlined" sx={{ width: 300 }}>
              <InputLabel
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Phân loại
              </InputLabel>
              <Select
                value={type}
                sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
                onChange={handleChangeType}
                label="Phân loại"
                autoWidth
                displayEmpty
              >
                <MenuItem value={"All"} sx={{ fontFamily: "Montserrat" }}>
                  Tất cả
                </MenuItem>
                {HISTORY_FILTER.map((statusOption) => (
                  <MenuItem
                    key={statusOption.id}
                    value={statusOption.value}
                    sx={{ fontFamily: "Montserrat" }}
                  >
                    {statusOption.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Divider
            sx={{
              margin: "24px 0",
            }}
          ></Divider>
          <Box>
            <Box>
              {items.map((item) => (
                <Box
                  key={item.id}
                  height={70}
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box width={`calc(100% - 250px)`}>
                    <Typography
                      fontFamily={"Montserrat,sans-serif"}
                      sx={{
                        display: "flex",
                      }}
                    >
                      <DoubleArrowIcon sx={{ marginRight: "10px" }} />
                      {item.historyMessage}
                    </Typography>
                  </Box>
                  <Box
                    width={250}
                    sx={{
                      fontFamily: "Montserrat,sans-serif",
                      textAlign: "right",
                    }}
                  >
                    {format(new Date(item.createdAt), "yyyy-MM-dd / hh:ss:mm")}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box p={2}>
              <TablePagination
                component="div"
                count={total}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={offset}
                rowsPerPage={limit}
                rowsPerPageOptions={[50, 100, 200]}
              />
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default InfiniteList;
