import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Box, Card, Container, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import audit from "../../../api/audit";

async function fetchIssues(offset) {
  const links = await audit.getHistory({ limit: 15, offset });
  const issues = links.data.data;

  return {
    links,
    issues,
  };
}

function InfiniteList() {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState(
    "https://api.github.com/repos/facebook/react/issues"
  );
  const [fetching, setFetching] = useState(false);

  const fetchItems = useCallback(async () => {
    if (fetching) {
      return;
    }

    setFetching(true);

    try {
      const { issues, links } = await fetchIssues(offset);
      let newOffset = offset + 15;
      setOffset(newOffset);
      setItems([...items, ...issues]);

      if (issues.length > 0) {
        setNextPageUrl(links.data.data);
      } else {
        setNextPageUrl(null);
      }
    } finally {
      setFetching(false);
    }
  }, [items, fetching, nextPageUrl]);

  const hasMoreItems = !!nextPageUrl;

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

  return (
    <Box>
      <Container>
        <Card
          sx={{
            p: 3,
            mt: 3,
          }}
        >
          <Box>Lịch sử thao tác</Box>
          <Divider
            sx={{
              margin: "24px 0",
            }}
          ></Divider>
          <Box>
            <InfiniteScroll
              loadMore={fetchItems}
              hasMore={hasMoreItems}
              loader={loader}
            >
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
                      {format(
                        new Date(item.createdAt),
                        "yyyy-MM-dd / hh:ss:mm"
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </InfiniteScroll>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default InfiniteList;
