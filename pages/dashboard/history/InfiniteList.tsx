import { Box, Card, Container } from "@mui/material";
import React, { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import audit from "../../../api/audit";
import { HistoryList } from "../../../types/DashboardTypes/history";
import { NewsList } from "../../../types/DashboardTypes/news";

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
        <Card>
          <Box>
            <InfiniteScroll
              loadMore={fetchItems}
              hasMore={hasMoreItems}
              loader={loader}
            >
              <Box>
                {items.map((item) => (
                  <Box key={item.id} height={100}>
                    {item.historyMessage}
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
