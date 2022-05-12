import { FC, ChangeEvent, useState } from "react";

import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
} from "@mui/material";
import {
  AccountData,
  AccountDataRole,
} from "../../../../types/DashboardTypes/account";

import EditSmileCoin from "../DialogCommon/EditSmileCoin";
import EditRole from "../DialogCommon/EditRole";
import WarningSubmit from "../DialogCommon/WarningSubmit";

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: AccountData[];
}

interface Filters {
  status?: AccountDataRole;
}

const getStatusLabel = (cryptoOrderStatus: AccountDataRole): JSX.Element => {
  const map = {
    user: {
      text: "User",
      color: "error",
    },
    admin: {
      text: "Admin",
      color: "success",
    },
    mod: {
      text: "CTV",
      color: "warning",
    },
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Box color={color}>{text}</Box>;
};

const applyFilters = (
  cryptoOrders: AccountData[],
  filters: Filters
): AccountData[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.role !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: AccountData[],
  page: number,
  limit: number
): AccountData[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const TableAccount: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
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
      id: "admin",
      name: "Admin",
    },
    {
      id: "mod",
      name: "CTV",
    },
    {
      id: "user",
      name: "User",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
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

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
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
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}
              >
                Role
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
        title="Tài khoản"
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
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Smile Coin</TableCell>
              <TableCell>Role</TableCell>
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
                      {cryptoOrder.name}
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
                      {cryptoOrder.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {toMoney(cryptoOrder.smileCoin)}
                    </Typography>
                  </TableCell>

                  <TableCell>{getStatusLabel(cryptoOrder.role)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Cập nhật Smile coin" arrow>
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
                        <EditSmileCoin />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa role" arrow>
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
                        <EditRole />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Xóa tài khoản" arrow>
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
                    </Tooltip> */}
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

TableAccount.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

TableAccount.defaultProps = {
  cryptoOrders: [],
};

export default TableAccount;
