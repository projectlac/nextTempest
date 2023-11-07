import {
  Box,
  Card,
  CardHeader,
  Checkbox,
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
import AddHsr from "../DialogCommon/AddHsr";
import EditHsr from "../DialogCommon/EditHsr";
import Refund from "../DialogCommon/Refund";
import WarningSubmit from "../DialogCommon/WarningSubmit";
import BulkActions from "./BulkActions";
import DialogBulkUpdate from "../DialogCommon/DialogBulkUpdate/DialogBulkUpdate";
import { useAppContext } from "../../../../context/state";
interface AccountTable {
  name: string;
  code: string;
  newPrice: number;
  id: string;
  updatedAt: string;
  soldAt: string | null;
}

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: AccountTable[];
  total: number;
  handleChangeLimit: (data: number) => void;
  handleChangePage: (data: number) => void;
}

const TableHsr: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  handleChangeLimit,
  handleChangePage,
  total,
}) => {
  const { role } = useAppContext();
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );

  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const resetSelected = () => {
    setSelectedCryptoOrders([]);
  };
  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    handleChangePage(newPage * 10);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    handleChangeLimit(parseInt(event.target.value));
  };
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
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

  // const filteredCryptoOrders = applyFilters(cryptoOrders);
  // const paginatedCryptoOrders = applyPagination(
  //   filteredCryptoOrders,
  //   page,
  //   limit
  // );

  const theme = useTheme();

  const toMoney = (price: number) => {
    return price
      ? price
          .toString()
          .split("")
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ".") + prev;
          })
      : 0;
  };

  return (
    <Card>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {selectedBulkActions && (
          <Box flex={1} p={2}>
            <BulkActions
              selectedCryptoOrders={selectedCryptoOrders}
              resetSelected={resetSelected}
            />
          </Box>
        )}
        {selectedBulkActions && role === "ADMIN" && (
          <Box flex={1} p={2}>
            <DialogBulkUpdate
              selectedCryptoOrders={selectedCryptoOrders}
              resetSelected={resetSelected}
            />
          </Box>
        )}
      </Box>
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
        action={<AddHsr />}
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
              {" "}
              <TableCell width={"5%"} padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Mã Account</TableCell>
              <TableCell>Giá bán</TableCell>
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
            {cryptoOrders.map((cryptoOrder, index) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                cryptoOrder.id
              );
              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, cryptoOrder.id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
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
                      {cryptoOrder.name.slice(0, 40)}
                      {cryptoOrder.name.length > 40 && "..."}
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
                      {cryptoOrder.code}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {toMoney(cryptoOrder.newPrice)} VNĐ
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      sx={{
                        "& span": {
                          background: `${
                            cryptoOrder.soldAt !== null ? "#ff8484" : "#86ff84"
                          }`,
                          color: `${
                            cryptoOrder.soldAt !== null ? "#a30000" : "#00a33a"
                          }`,
                          fontSize: "14px",
                          textAlign: "center",
                          borderRadius: "15px",
                          padding: "2px 7px",
                        },
                      }}
                    >
                      <span>
                        {cryptoOrder.soldAt !== null ? "Hết hàng" : "Còn hàng"}{" "}
                      </span>
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
                    {cryptoOrder.soldAt !== null && (
                      <Tooltip title="Hoàn trả trạng thái" arrow>
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
                          <Refund id={cryptoOrder.id} />
                        </IconButton>
                      </Tooltip>
                    )}

                    {cryptoOrder.soldAt === null && (
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
                          <EditHsr id={cryptoOrder.id} />
                        </IconButton>
                      </Tooltip>
                    )}

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

TableHsr.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

TableHsr.defaultProps = {
  cryptoOrders: [],
};

export default TableHsr;
