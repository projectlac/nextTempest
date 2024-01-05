import {
  Box,
  Card,
  CardHeader,
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
} from "@mui/material";
import PropTypes from "prop-types";
import { ChangeEvent, FC, useState } from "react";
import {
  AccountData,
  AccountDataRole,
} from "../../../../types/DashboardTypes/account";
import toMoney from "../../../../utility/toMoney";
import EditRole from "../DialogCommon/EditRole";
import EditSmileCoin from "../DialogCommon/EditSmileCoin";
import { useAppContext } from "../../../../context/state";

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: AccountData[];
  handleChangeRole: (data: AccountDataRole) => void;
  handleChangeLimit: (data: number) => void;
  handleChangePage: (data: number) => void;
  total: number;
}

interface Filters {
  status?: AccountDataRole;
}

const getStatusLabel = (cryptoOrderStatus: AccountDataRole): JSX.Element => {
  const map = {
    USER: {
      text: "User",
      color: "error",
    },
    ADMIN: {
      text: "Admin",
      color: "success",
    },
    MOD: {
      text: "CTV",
      color: "warning",
    },
    CHECKED: {
      text: "CHECKED",
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

const TableAccount: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  handleChangeRole,
  handleChangeLimit,
  handleChangePage,
  total,
}) => {
  const { role } = useAppContext();
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );

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
    let value;
    if (e.target.value !== "all") {
      value = e.target.value;
      handleChangeRole(e.target.value.toUpperCase() as AccountDataRole);
    } else {
      handleChangeRole("" as AccountDataRole);
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
                      {cryptoOrder.username}
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
                    {["ADMIN"].includes(role) && (
                      <Typography
                        variant="caption"
                        fontStyle={"italic"}
                        color="text.primary"
                      >
                        UserID: {cryptoOrder.id}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {toMoney(cryptoOrder.money)}
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
                        <EditSmileCoin
                          username={cryptoOrder.username}
                          money={+cryptoOrder.money}
                        />
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
                        <EditRole
                          username={cryptoOrder.username}
                          roleCurrenly={cryptoOrder.role}
                        />
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

TableAccount.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

TableAccount.defaultProps = {
  cryptoOrders: [],
};

export default TableAccount;
