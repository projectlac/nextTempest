import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { ChangeEvent, FC, useState } from "react";
import { NewsList } from "../../../../types/DashboardTypes/news";
import AddNews from "../DialogCommon/AddNews";
import EditNews from "../DialogCommon/EditNews";
import EditRole from "../DialogCommon/EditRole";
import WarningSubmit from "../DialogCommon/WarningSubmit";

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: NewsList[];
}

const applyFilters = (cryptoOrders: NewsList[]): NewsList[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;
    return matches;
  });
};

const applyPagination = (
  cryptoOrders: NewsList[],
  page: number,
  limit: number
): NewsList[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const TableNews: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId,
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();

  const toMoney = (price: string) => {
    return price
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };

  return (
    <Card>
      <CardHeader
        sx={{
          "& .MuiCardHeader-content": {
            "& .MuiCardHeader-title": {
              fontSize: {
                md: "1.2rem",
                xs: "15px",
              },
            },
          },
        }}
        title="Tin tức"
        action={<AddNews />}
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell>STT</TableCell>
              <TableCell>Tin tức</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Ngày cập nhật</TableCell>

              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& .MuiTableCell-root": {
                fontFamily: "Montserrat",
                "& p": {
                  fontFamily: "Montserrat",
                },
              },
            }}
          >
            {paginatedCryptoOrders.map((cryptoOrder, index) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                cryptoOrder.id
              );
              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.title.slice(0, 40)}
                      {cryptoOrder.title.length > 40 && "..."}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                    ></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.description.slice(0, 40)}
                      {cryptoOrder.description.length > 40 && "..."}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(
                        new Date(cryptoOrder.updatedAt),
                        "yyyy-MM-dd / hh:ss:mm"
                      )}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Chỉnh sửa bài viết" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: "#b16c4d45",
                          },
                          color: "#333",
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditNews id={cryptoOrder.id} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa bài viết" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: "#b16c4d45" },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <WarningSubmit status={3} id={"2312"} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

TableNews.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

TableNews.defaultProps = {
  cryptoOrders: [],
};

export default TableNews;
