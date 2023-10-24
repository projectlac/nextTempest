import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import paymentApi from "../../../../../../api/paymentApi";
import InfiniteCustom from "./InfiniteCustom";
import toMoney from "../../../../../../utility/toMoney";

const BodyTable = styled(Box)({
  background: "#e4ddd2",
  display: "flex",
  overflow: "hidden",
  overflowY: "auto",
  color: "#6B5E4F",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "& > div ": {
    height: "70px",

    borderBottom: " 2px solid #DAB88F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:first-of-type": {
      borderLeft: "none",
    },
    "@media (min-width:0)": {
      fontSize: "13px",
    },
    "@media (min-width: 1024px)": {
      fontSize: "14px",
    },
  },
});

async function fetchIssues(offset) {
  const links = await paymentApi.getHistoryOfUser(offset);
  const data = links.data.data;
  const total = links.data.total;
  return {
    data,
    total,
  };
}

function InfinityListHistory() {
  const [items, setItems] = useState([]);

  const [offset, setOffset] = useState<number>(0);
  const [totalRows, setTotalRows] = useState(0);

  const fetchItems = useCallback(
    async (offset: number) => {
      try {
        const { data, total } = await fetchIssues(offset);
        let newOffset = offset + 9;
        setOffset(newOffset);
        setTotalRows(total);
        setItems([...items, ...data]);
      } finally {
      }
    },
    [items]
  );

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

  const renderGame = useCallback((slug: string) => {
    let game = "";
    switch (slug) {
      case "genshin-impact":
        game = "Genshin Impact";
        break;
      case "honkai-star-rail":
        game = "Honkai Star Rail";
        break;

      default:
        game = "ToF";
        break;
    }
    return game;
  }, []);

  useEffect(() => {
    fetchItems(offset);
  }, [offset]);

  return (
    <InfiniteCustom
      loader={loader}
      fetchMore={() => setOffset((prev) => prev + 9)}
      hasMore={items.length < totalRows}
      endMessage={<p>You have seen it all</p>}
    >
      <Box>
        {items.map((item, index) => (
          <BodyTable key={item.id}>
            <Box width={"5%"}>{index + 1}</Box>
            <Box width={"15%"}>
              <Box>{item.code}</Box>
            </Box>
            <Box
              width={"20%"}
              sx={{
                wordBreak: "break-word",
                padding: "0 7px",
              }}
            >
              {!item?.tofUsername?.trim() || item?.tofUsername === null
                ? "Liên hệ Fanpage"
                : item?.tofUsername}
            </Box>

            <Box
              width={"20%"}
              sx={{
                wordBreak: "break-word",
                padding: "0 7px",
              }}
            >
              {!item?.tofPassword?.trim() || item?.tofPassword === null
                ? "Liên hệ Fanpage"
                : item?.tofPassword}
            </Box>
            <Box width={"20%"}>{toMoney(item?.newPrice ?? 0)} VNĐ</Box>
            <Box width={"20%"}>{renderGame(item?.game)}</Box>
          </BodyTable>
        ))}
      </Box>
    </InfiniteCustom>
  );
}

export default InfinityListHistory;
