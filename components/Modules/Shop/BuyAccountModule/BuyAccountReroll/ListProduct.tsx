/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import tagApi from "../../../../../api/tag";
import { useAppContext } from "../../../../../context/state";
import ShopItem from "../../ShopItem";
import image from "../../../../../styles/assets/images/version25-genshinimpact-04-1643479276-51.jpg";
function ListProduct() {
  const { selectedFilter, update } = useAppContext();
  const [pageCurrently, setPageCurrently] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [productList, setProductList] = useState<any>([]);

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

  enum CONST_INFORMATION {
    LIMIT = 9,
  }

  useEffect(() => {
    const getData = async () => {
      try {
        await tagApi
          .getRerollAccount(CONST_INFORMATION.LIMIT, pageCurrently)
          .then((res) => {
            setProductList(res.data.data);
            setTotal(res.data.total);
          });
      } catch (error) {}
    };
    getData();
  }, [update, pageCurrently]);

  return (
    <Box
      sx={{
        position: "relative",
        width: {
          lg: 1014,
          xs: "100%",
        },
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: {
            md: "0px 30px 50px",
            xs: "0px 7px 50px",
          },
          position: "relative",
          zIndex: 2,
        }}
        id="scrollTo"
      >
        <Grid container columnSpacing={3}>
          {productList.length > 0 ? (
            productList.map((d, i) => (
              <Grid
                item
                md={4}
                sm={4}
                xs={6}
                key={i}
                sx={{
                  mb: {
                    lg: 5,
                    md: 4,
                    sm: 3,
                    xs: 2,
                  },
                }}
              >
                <ShopItem
                  image={image.src}
                  item={""}
                  idProduct={null}
                  oldPrice={0}
                  newPrice={50000}
                  status={!d.isSold ? "AVAILABLE" : "SOLD"}
                  slug={d.slug}
                  id={d.id}
                />
              </Grid>
            ))
          ) : (
            <Box width={"100%"}>
              <Typography
                textAlign={"center"}
                color="#4B66A2"
                sx={{
                  fontSize: {
                    md: 25,
                    xs: 17,
                  },
                }}
              >
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