import { Box, Grid, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import tagApi from "../../../../api/tag";
import ShopItem from "../ShopItem";

function ListProduct() {
  const [pageCurrently, setPageCurrently] = useState<number>(1);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageCurrently(page);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await tagApi
          .getAccount({
            character: "",
            limit: 9,
            offset: 0,
            server: "",
            weapon: "",
          })
          .then((res) => console.log(res.data));
      } catch (error) {}
    };
    getData();
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box sx={{ padding: "70px 30px 50px" }}>
        <Grid container columnSpacing={3}>
          {[...Array(9)].map((d, i) => (
            <Grid
              item
              md={4}
              key={i}
              sx={{
                mb: 5,
              }}
            >
              <ShopItem
                item={`[Asia] AR49 - Itto, Zhongli, Jean, Diluc, Mona
                `}
                oldPrice={"2.400.164 VND"}
                newPrice={"1.611.277 VND"}
                status={0}
                id={"123456789"}
              />
            </Grid>
          ))}
          <Box sx={{ margin: "0 auto" }}>
            <Stack spacing={2}>
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
            </Stack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default ListProduct;
