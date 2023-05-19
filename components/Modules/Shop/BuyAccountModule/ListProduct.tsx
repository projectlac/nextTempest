/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Grid,
  Hidden,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import tagApi from "../../../../api/tag";
import { useAppContext } from "../../../../context/state";
import ShopItem from "../ShopItem";
import FilterMobile from "./FilterMobile/FilterMobile";
import FindByAr from "./FindByAr";
import FindByCode from "./FindByCode";
import PrireFilter from "./PrireFilter";
import SortOption from "./SortOption";
interface IBuy {
  slug: string;
  type: string;
}
function ListProduct({ slug, type }: IBuy) {
  const { selectedFilter, update } = useAppContext();
  const [pageCurrently, setPageCurrently] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [productList, setProductList] = useState<any>([]);
  const [sortBy, setSortBy] = useState<number>(null);
  const [sortByPrice, setSortByPrice] = useState<number[]>([0]);
  const [findCode, setFindCode] = useState<string>("");
  const [findAr, setFindAr] = useState<string>("");

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
  const handleSortByPrice = (data: string) => {
    const newArr = data.split("-");
    if (newArr[0] !== "all") {
      setSortByPrice(newArr.map(Number));
      setPageCurrently(0);
    } else {
      setSortByPrice([0]);
      setPageCurrently(0);
    }

    // setSortByPrice(data);
  };
  enum CONST_INFORMATION {
    LIMIT = 9,
  }

  const handleChangeCode = (code: string) => {
    setFindCode(code);
    setPageCurrently(0);
  };

  const handleChangeAr = (code: string) => {
    setFindAr(code);

    setPageCurrently(0);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (slug) {
          await tagApi
            .getAccountWithPage({
              character: selectedFilter.character.toString(),
              limit: CONST_INFORMATION.LIMIT,
              offset: pageCurrently,
              server: selectedFilter.server.toString(),
              weapon: selectedFilter.weapon.toString(),
              sort: sortBy,
              queryString: findCode,
              startPrice: sortByPrice[0],
              endPrice: sortByPrice[1],
              game: slug,
              isSold: false,
              arFrom: 0,
              arTo: findAr,
              type: type !== undefined ? type : "",
            })
            .then((res) => {

              setProductList(res.data.data);
              setTotal(res.data.total);
            });
        }
      } catch (error) { }
    };
    getData();
  }, [update, sortBy, pageCurrently, findCode, sortByPrice, findAr]);

  useEffect(() => {
    const getData = async () => {


      try {
        if (slug) {
          await tagApi
            .getAccount({
              character: "",
              limit: CONST_INFORMATION.LIMIT,
              offset: 0,
              server: "",
              weapon: "",
              sort: sortBy,
              queryString: "",
              startPrice: sortByPrice[0],
              endPrice: sortByPrice[1],
              game: slug,
              isSold: false,
              type: type !== undefined ? type : "",
            })
            .then((res) => {
              // const sold = res.data.data.filter(
              //   (d) => d.status === "AVAILABLE"
              // );

              setProductList(res.data.data);
              setTotal(res.data.total);
            });
        }
      } catch (error) { }
    };
    getData();
  }, [slug]);

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
        <Hidden mdDown>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <FindByAr handleChangeCode={handleChangeAr} />

            <FindByCode handleChangeCode={handleChangeCode} />
            <PrireFilter handleSortByPrice={handleSortByPrice} />
            <SortOption handleSortBy={handleSortBy} />
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              mb: 1,
            }}
          >
            <FindByAr handleChangeCode={handleChangeAr} />
            <FindByCode handleChangeCode={handleChangeCode} />
            <PrireFilter handleSortByPrice={handleSortByPrice} />
            <SortOption handleSortBy={handleSortBy} />
          </Box>
          <FilterMobile slug={slug}></FilterMobile>
        </Hidden>
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
