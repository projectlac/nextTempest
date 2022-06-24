/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import tagApi from "../../../../api/tag";
import { useAppContext } from "../../../../context/state";
import ShopItem from "../ShopItem";
import FindByCode from "./FindByCode";
import SortOption from "./SortOption";

function ListProduct() {
  const { selectedFilter, update } = useAppContext();
  const [pageCurrently, setPageCurrently] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [productList, setProductList] = useState<any>([]);
  const [sortBy, setSortBy] = useState<number>(null);
  const [findCode, setFindCode] = useState<string>("");

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageCurrently((page - 1) * 9);
    executeScroll();
  };

  const executeScroll = () => {
    const id = "scrollTo";
    const yOffset = -95;
    const element = document.getElementById(id);
    const y =
      element?.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleSortBy = (data: number) => {
    setSortBy(data);
  };
  enum CONST_INFORMATION {
    LIMIT = 9,
  }

  const handleChangeCode = (code: string) => {
    setFindCode(code);
    setPageCurrently(0);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        await tagApi
          .getAccount({
            character: selectedFilter.character.toString(),
            limit: CONST_INFORMATION.LIMIT,
            offset: pageCurrently,
            server: selectedFilter.server.toString(),
            weapon: selectedFilter.weapon.toString(),
            sort: sortBy,
            queryString: findCode,
          })
          .then((res) => {
            setProductList(res.data.data);
            setTotal(res.data.total);
          });
      } catch (error) {}
    };
    getData();
  }, [update, sortBy, pageCurrently, findCode]);
  return (
    <Box
      sx={{
        position: "relative",
        width: {
          lg: 1014,
          md: "100%",
          sm: 666,
          xs: "100%",
        },
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          padding: {
            md: "0px 30px 50px",
            xs: "0px 15px 50px",
          },
          position: "relative",
          zIndex: 2,
        }}
        id="scrollTo"
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <FindByCode handleChangeCode={handleChangeCode} />
          <SortOption handleSortBy={handleSortBy} />
        </Box>
        <Grid container columnSpacing={3}>
          {productList.length > 0 ? (
            productList.map((d, i) => (
              <Grid
                item
                md={4}
                sm={6}
                xs={12}
                key={i}
                sx={{
                  mb: 5,
                }}
              >
                <ShopItem
                  image={d.imageUrl}
                  item={d.name}
                  idProduct={d.code}
                  oldPrice={+d.oldPrice}
                  newPrice={+d.newPrice}
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
        </Grid>
        <Box
          sx={{ margin: "0 auto", display: "flex", justifyContent: "center" }}
        >
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
                count={Math.ceil(total / CONST_INFORMATION.LIMIT)}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePagination}
              />
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default ListProduct;
