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
} from "@mui/material";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { ChangeEvent, FC, useState } from "react";
import WarningSubmit from "../../DialogCommon/DialogReroll/WarningSubmit";
import AddZzz from "../DialogCommon/AddZzz";
import EditZzz from "../DialogCommon/EditZzz";

interface AccountTable {
  name: string;
  id: string;
  updatedAt: string;
  isSold: boolean;
  username: string;
  slug: string;
}

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: AccountTable[];
  total: number;
  handleChangeLimit: (data: number) => void;
  handleChangePage: (data: number) => void;
  type: string;
}

const TableDynamicRerollOrRandom: FC<RecentOrdersTableProps> = ({
  cryptoOrders,
  handleChangeLimit,
  handleChangePage,
  total,
  type,
}) => {
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
        title={`Danh sách account ${type}`}
        action={<AddZzz />}
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
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              {/* <TableCell>Mã account</TableCell> */}

              <TableCell>Tình trạng</TableCell>
              <TableCell>Ngày cập nhật</TableCell>
              <TableCell>Xóa</TableCell>
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
              return (
                <TableRow hover key={cryptoOrder.id}>
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
                      sx={{
                        "& span": {
                          background: `${
                            cryptoOrder.isSold !== false ? "#ff8484" : "#86ff84"
                          }`,
                          color: `${
                            cryptoOrder.isSold !== false ? "#a30000" : "#00a33a"
                          }`,
                          fontSize: "14px",
                          textAlign: "center",
                          borderRadius: "15px",
                          padding: "2px 7px",
                        },
                      }}
                    >
                      <span>
                        {cryptoOrder.isSold !== false ? "Đã bán" : "Còn hàng"}
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
                  <TableCell>
                    {cryptoOrder.isSold === false && (
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
                          <EditZzz id={cryptoOrder.slug} />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Tooltip title="Xóa bài viết" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: "#b16c4d45" },
                          color: "#d33",
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

TableDynamicRerollOrRandom.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

TableDynamicRerollOrRandom.defaultProps = {
  cryptoOrders: [],
};

export default TableDynamicRerollOrRandom;
