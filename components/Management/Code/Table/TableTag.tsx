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
import { renderCode } from "../../../../utility/renderCode";
import DeleteCode from "../DialogCommon/DialogEdit/DialogEdit";

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: any[];
  nameOfCode: string;
  total: number;
}

const applyFilters = (cryptoOrders: any[]): any[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;
    return matches;
  });
};

const applyPagination = (
  cryptoOrders: any[],
  page: number,
  limit: number
): any[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const TableTag: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  nameOfCode,
  total,
}) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  // useEffect(() => {
  //   setPage(0);
  // }, [gameSelected]);
  // const handleSelectOneCryptoOrder = (
  //   event: ChangeEvent<HTMLInputElement>,
  //   cryptoOrderId: string
  // ): void => {
  //   if (!selectedCryptoOrders.includes(cryptoOrderId)) {
  //     setSelectedCryptoOrders((prevSelected) => [
  //       ...prevSelected,
  //       cryptoOrderId,
  //     ]);
  //   } else {
  //     setSelectedCryptoOrders((prevSelected) =>
  //       prevSelected.filter((id) => id !== cryptoOrderId)
  //     );
  //   }
  // };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    // handleChangePage(newPage * 10);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    // handleChangeLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
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
        title="Danh sách Code"
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
              <TableCell>Code</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Tình trạng</TableCell>
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
                      {renderCode(cryptoOrder.code)}
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
                      {nameOfCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      gutterBottom
                      noWrap
                      sx={{
                        color: cryptoOrder?.isSold ? "#d33" : "#000",
                      }}
                    >
                      {cryptoOrder?.isSold ? "Đã bán" : "Còn hàng"}
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
                    {!cryptoOrder.isSold && (
                      <Tooltip title="Chỉnh sửa tag" arrow>
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
                          <DeleteCode id={cryptoOrder.id} />
                        </IconButton>
                      </Tooltip>
                    )}
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

TableTag.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

TableTag.defaultProps = {
  cryptoOrders: [],
};

export default TableTag;
