import { Card } from "@mui/material";
import { NewsList } from "../../../../types/DashboardTypes/news";
import TableNews from "./TableNews";
import { useEffect, useState } from "react";
import newsApi from "../../../../api/newsApi";
import { useAppContext } from "../../../../context/state";
function DataNews() {
  // const cryptoOrders: NewsList[] = [
  //   {
  //     id: "1",
  //     name: "Lorem",
  //     image: "",
  //     description: "",
  //     body: "",
  //     created: "10/5/2022",
  //   },
  //   {
  //     id: "12",
  //     name: "Lorem",
  //     image: "",
  //     description: "",
  //     body: "",
  //     created: "10/5/2022",
  //   },
  //   {
  //     id: "13",
  //     name: "Lorem",
  //     image: "",
  //     description: "",
  //     body: "",
  //     created: "10/5/2022",
  //   },
  //   {
  //     id: "121",
  //     name: "Lorem",
  //     image: "",
  //     description: "",
  //     body: "",
  //     created: "10/5/2022",
  //   },
  //   {
  //     id: "231",
  //     name: "Lorem",
  //     image: "",
  //     description: "",
  //     body: "",
  //     created: "10/5/2022",
  //   },
  //   {
  //     id: "111",
  //     name: "Lorem",
  //     image: "",
  //     description: "",
  //     body: "",
  //     created: "10/5/2022",
  //   },
  //   {
  //     id: "221",
  //     name: "Lorem",
  //     image: "",
  //     description: "",
  //     body: "",
  //     created: "10/5/2022",
  //   },
  //   {
  //     id: "331",
  //     name: "Lorem",
  //     image: "",
  //     description: "",
  //     body: "",
  //     created: "10/5/2022",
  //   },
  //   {
  //     id: "136",
  //     name: "Lorem",
  //     image: "",
  //     description: "",
  //     body: "",
  //     created: "10/5/2022",
  //   },
  //   {
  //     id: "94",
  //     name: "Lorem",
  //     image: "",
  //     description: "",
  //     body: "",
  //     created: "10/5/2022",
  //   },
  // ];
  const [cryptoOrders, setCryptoOrders] = useState<NewsList[]>([]);
  const [limitPage, setLimitPage] = useState<number>(10);
  const [offsetPage, setOffsetPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const { update } = useAppContext();

  const handleChangeLimit = (data: number) => {
    setLimitPage(data);
  };
  const handleChangePage = (data: number) => {
    setOffsetPage(data);
  };

  useEffect(() => {
    newsApi.getAll({ limit: limitPage, offset: offsetPage }).then((res) => {
      const data = res.data.data.map((d) => {
        const { content, ...result } = d;
        return result;
      });

      setCryptoOrders(data);
      let total = res.data.total;
      setTotal(total);
      // let temp = total % limitPage;
      // if (temp === 0) {
      //   setTotal(total / limitPage);
      // } else {
      //   setTotal(Math.floor(total / limitPage) + 1);
      // }
    });
  }, [update, limitPage, offsetPage]);
  return (
    <Card>
      <TableNews
        cryptoOrders={cryptoOrders}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        total={total}
      />
    </Card>
  );
}

export default DataNews;
