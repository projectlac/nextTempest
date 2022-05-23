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
import AddGenshin from "../DialogCommon/AddGenshin";
import EditNews from "../DialogCommon/EditGenshin";
import WarningSubmit from "../DialogCommon/WarningSubmit";

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: NewsList[];
  total: number;
  handleChangeLimit: (data: number) => void;
  handleChangePage: (data: number) => void;
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

const TableGenshin: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  handleChangeLimit,
  handleChangePage,
  total,
}) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    handleChangePage(newPage * 10);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    handleChangeLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

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
        title="Danh sách account"
        action={<AddGenshin />}
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
                        <WarningSubmit status={3} id={cryptoOrder.id} />
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
          count={total}
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

TableGenshin.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

TableGenshin.defaultProps = {
  cryptoOrders: [],
};

export default TableGenshin;
