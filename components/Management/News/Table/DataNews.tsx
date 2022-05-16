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
  const { update } = useAppContext();
  useEffect(() => {
    newsApi.getAll({ limit: limitPage, offset: offsetPage }).then((res) => {
      const data = res.data.map((d) => {
        const { content, ...result } = d;
        return result;
      });
      setCryptoOrders(data);
    });
  }, [update, limitPage, offsetPage]);
  return (
    <Card>
      <TableNews cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default DataNews;
