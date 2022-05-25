/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import tagApi from "../../../../api/tag";
import { useAppContext } from "../../../../context/state";
import ShopItem from "../ShopItem";
import SortOption from "./SortOption";

function ListProduct() {
  const { selectedFilter, update } = useAppContext();
  const [pageCurrently, setPageCurrently] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [productList, setProductList] = useState<any>([]);
  const [sortBy, setSortBy] = useState<number>(null);
  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageCurrently(page - 1);
  };

  const handleSortBy = (data: number) => {
    setSortBy(data);
  };
  const toMoney = (price: number) => {
    return price
      ? price
          .toString()
          .split("")
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ".") + prev;
          })
      : "0";
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await tagApi
          .getAccount({
            character: selectedFilter.character.toString(),
            limit: 9,
            offset: pageCurrently,
            server: selectedFilter.server.toString(),
            weapon: selectedFilter.weapon.toString(),
            sort: sortBy,
          })
          .then((res) => {
            setProductList(res.data.data);
            setTotal(res.data.total);
          });
      } catch (error) {}
    };
    getData();
  }, [update, sortBy, pageCurrently]);
  return (
    <Box
      sx={{
        position: "relative",
        minWidth: 1014,
      }}
    >
      <Box sx={{ padding: "0px 30px 50px", position: "relative", zIndex: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <SortOption handleSortBy={handleSortBy} />
        </Box>
        <Grid container columnSpacing={3}>
          {productList.length > 0 ? (
            productList.map((d, i) => (
              <Grid
                item
                md={4}
                key={i}
                sx={{
                  mb: 5,
                }}
              >
                <ShopItem
                  image={d.imageUrl}
                  item={d.name}
                  oldPrice={`${toMoney(d.oldPrice)} VND`}
                  newPrice={`${toMoney(d.newPrice)} VND`}
                  status={d.status}
                  slug={d.slug}
                  id={d.id}
                />
              </Grid>
            ))
          ) : (
            <Box width={"100%"}>
              <Typography textAlign={"center"} color="#4B66A2" fontSize={25}>
                Không có kết quả tương ứng!
              </Typography>
            </Box>
          )}
          <Box sx={{ margin: "0 auto" }}>
            <Stack spacing={2}>
              {total > 10 && (
                <Pagination
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#818D9E",
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                      color: "#356495",
                    },
                  }}
                  count={10}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChangePagination}
                />
              )}
            </Stack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default ListProduct;
