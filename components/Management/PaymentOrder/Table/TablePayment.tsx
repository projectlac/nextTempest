import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Card,
  CardHeader,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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
import PropTypes from "prop-types";
import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  CryptoOrder,
  CryptoOrderStatus,
} from "../../../../types/DashboardTypes/payment";
import WarningSubmit from "../DialogCommon/WarningSubmit";
interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
  handleChangeLimit: (data: number) => void;
  handleChangePage: (data: number) => void;
  handleChangeStatus: (data: string) => void;
  total: number;
}

interface Filters {
  status?: CryptoOrderStatus;
}

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: "Failed",
      color: "#f00",
    },
    COMPLETED: {
      text: "Hoàn thành",
      color: "#00bd0f",
    },
    PENDING: {
      text: "Đang xử lý",
      color: "#567aff",
    },
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return (
    <Box color={color} sx={{ fontWeight: "bold" }}>
      {text}
    </Box>
  );
};

const applyFilters = (
  cryptoOrders: CryptoOrder[],
  filters: Filters
): CryptoOrder[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const TablePayment: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  handleChangeLimit,
  handleChangePage,
  handleChangeStatus,
  total,
}) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "completed",
      name: "Completed",
    },
    {
      id: "pending",
      name: "Pending",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
      handleChangeStatus(e.target.value.toUpperCase() as CryptoOrderStatus);
    } else {
      handleChangeStatus("" as CryptoOrderStatus);
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    handleChangePage(newPage * 10);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    handleChangeLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  const theme = useTheme();

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
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Status
              </InputLabel>
              <Select
                value={filters.status || "all"}
                sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem
                    key={statusOption.id}
                    value={statusOption.id}
                    sx={{ fontFamily: "Montserrat" }}
                  >
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="Thông tin đơn nạp"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  fontFamily: "Montserrat",
                },

                "& >th": {
                  fontSize: "16px",
                  fontWeight: "bold",
                },
                "& >td": {
                  fontSize: "16px",
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell>#</TableCell>
              <TableCell>Tài khoản</TableCell>
              <TableCell>UID</TableCell>
              <TableCell>Server</TableCell>
              <TableCell>Tổng tiền</TableCell>

              <TableCell align="right">Trạng thái</TableCell>
              <TableCell align="right">Actions</TableCell>
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
            {/* {paginatedCryptoOrders.map((cryptoOrder, index) => {
              
            })} */}

            {cryptoOrders.map((row, index) => (
              <Row key={row.id} row={row} />
            ))}
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

TablePayment.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

TablePayment.defaultProps = {
  cryptoOrders: [],
};

export default TablePayment;

function Row(props: { row: CryptoOrder }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

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
    <>
      <TableRow hover key={row.id}>
        <TableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {row.user}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
          ></Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {row.UID}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            Asia
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" color="text.primary" gutterBottom noWrap>
            {row.total}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {row.note}
          </Typography>
        </TableCell>

        <TableCell align="right">{getStatusLabel(row.status)}</TableCell>
        <TableCell align="right">
          {row.status !== "COMPLETED" ? (
            <Tooltip title="Hoàn thành" arrow>
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
                <WarningSubmit id={row.id} />
              </IconButton>
            </Tooltip>
          ) : (
            <CheckCircleOutlineIcon
              sx={{
                color: "#00bd0f",
              }}
            />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography
                fontSize={16}
                gutterBottom
                component="div"
                sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
              >
                Chi tiết
              </Typography>
              <Box
                mb={1}
                sx={{
                  display: "flex",
                  "& > div": {
                    width: "50%",
                  },
                }}
              >
                <Box>
                  <Typography>
                    <b>Username</b>: {row.username}
                  </Typography>
                  <Typography>
                    <b>Password</b>: {row.password}
                  </Typography>
                  <Typography>
                    <b>Server</b>: {row.server}
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    <b>UID</b>: {row.UID}
                  </Typography>
                  <Typography>
                    <b>Tên nhân vật</b>: {row.accountName}
                  </Typography>
                  <Typography>
                    <b>Số điện thoại</b>: {row.phone}
                  </Typography>
                </Box>
              </Box>
              <Box mb={1}>
                <Typography>
                  <b>Ghi chú</b>: <i>{row.note}</i>
                </Typography>
              </Box>
              <Divider></Divider>
              <Typography
                fontSize={16}
                my={2}
                gutterBottom
                component="div"
                sx={{ fontFamily: "Montserrat", fontWeight: "bold" }}
              >
                Thông tin nạp
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow
                    sx={{
                      "& >th": {
                        fontSize: "16px",
                        fontWeight: "bold",
                      },
                      "& >td": {
                        fontSize: "16px",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold" }}>Tên gói</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Số lượng</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Đơn giá</TableCell>

                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Tổng giá
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.auditInformations.map((historyRow, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "& >th": {
                          fontSize: "14px",
                          fontWeight: "bold",
                        },
                        "& >td": {
                          fontSize: "14px",
                          fontWeight: "bold",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>

                      <TableCell>{historyRow.quantity}</TableCell>
                      <TableCell>{toMoney(historyRow?.unitPrice)}</TableCell>

                      <TableCell align="right">
                        {toMoney(historyRow?.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
