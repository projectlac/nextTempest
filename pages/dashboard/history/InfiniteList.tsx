import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import audit from "../../../api/audit";
import { HistoryList } from "../../../types/DashboardTypes/history";
import { NewsList } from "../../../types/DashboardTypes/news";

async function fetchIssues(url) {
  const links = await audit.getHistory({ limit: 99, offset: 0 });
  const issues = links.data.data;

  return {
    links,
    issues,
  };
}

function InfiniteList() {
  const [items, setItems] = useState([]);
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
      const { issues, links } = await fetchIssues(nextPageUrl);

      setItems([...items, ...issues]);

      if (links.data) {
        setNextPageUrl(links.data.data);
      } else {
        setNextPageUrl(null);
      }
    } finally {
      setFetching(false);
    }
  }, [items, fetching, nextPageUrl]);

  const hasMoreItems = false;

  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

  return (
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
  );
}

export default InfiniteList;
