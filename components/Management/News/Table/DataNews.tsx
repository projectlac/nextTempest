import { Card } from "@mui/material";
import { NewsList } from "../../../../types/DashboardTypes/news";
import TableNews from "./TableNews";

function DataNews() {
  const cryptoOrders: NewsList[] = [
    {
      id: "1",
      name: "Lorem",
      image: "",
      description: "",
      body: "",
      created: "10/5/2022",
    },
    {
      id: "12",
      name: "Lorem",
      image: "",
      description: "",
      body: "",
      created: "10/5/2022",
    },
    {
      id: "13",
      name: "Lorem",
      image: "",
      description: "",
      body: "",
      created: "10/5/2022",
    },
    {
      id: "121",
      name: "Lorem",
      image: "",
      description: "",
      body: "",
      created: "10/5/2022",
    },
    {
      id: "231",
      name: "Lorem",
      image: "",
      description: "",
      body: "",
      created: "10/5/2022",
    },
    {
      id: "111",
      name: "Lorem",
      image: "",
      description: "",
      body: "",
      created: "10/5/2022",
    },
    {
      id: "221",
      name: "Lorem",
      image: "",
      description: "",
      body: "",
      created: "10/5/2022",
    },
    {
      id: "331",
      name: "Lorem",
      image: "",
      description: "",
      body: "",
      created: "10/5/2022",
    },
    {
      id: "136",
      name: "Lorem",
      image: "",
      description: "",
      body: "",
      created: "10/5/2022",
    },
    {
      id: "94",
      name: "Lorem",
      image: "",
      description: "",
      body: "",
      created: "10/5/2022",
    },
  ];

  return (
    <Card>
      <TableNews cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default DataNews;
