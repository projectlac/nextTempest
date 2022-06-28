import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Box, Card, Container, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import audit from "../../../../../../api/audit";
import styled from "@emotion/styled";

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
  const links = await audit.showHistoryOfAccount({ limit: 15, offset });
  const issues = links.data.data;

  return {
    links,
    issues,
  };
}

function InfinityListHistory() {
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

      if (issues.length < 10) {
        setNextPageUrl(null);
      } else {
        setNextPageUrl(links.data.data);
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
    <InfiniteScroll
      loadMore={fetchItems}
      hasMore={hasMoreItems}
      loader={loader}
    >
      <Box>
        {items.map((item, index) => (
          <BodyTable key={item.id}>
            <Box width={"7%"}>{index + 1}</Box>
            <Box width={"25%"}>
              <Box>
                {item.auditInformations.map((d) => (
                  <span key={d.id}>{d.name} - </span>
                ))}
              </Box>
            </Box>
            <Box width={"24%"}>{item.total}</Box>

            <Box width={"22%"}>{item?.note}</Box>
            <Box width={"22%"} textTransform="capitalize">
              {item.status.toLowerCase()}
            </Box>
          </BodyTable>
        ))}
      </Box>
    </InfiniteScroll>
  );
}

export default InfinityListHistory;
