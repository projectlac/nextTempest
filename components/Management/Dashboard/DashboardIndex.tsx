import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { format } from "date-fns";
import { Bar } from "react-chartjs-2";
import CountUp from "react-countup";
import audit from "../../../api/audit";
import toMoney from "../../../utility/toMoney";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IData {
  label: string;
  data: IChart;
}
interface IChart {
  countCreated: number;
  countRefund: number;
  countSold: number;
}
function DashboardIndex() {
  const date = new Date();
  const date1 = format(
    new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000),
    "MM/dd/yyyy"
  );
  const [role, setRole] = useState<string>("");
  const [start, setStart] = React.useState<string | null>(date1);
  const [end, setEnd] = React.useState<string | null>(
    format(new Date(), "MM/dd/yyyy")
  );
  const [ctvData, setCtvData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState<string>("0 VND");
  const [totalRemainingPrice, setTotalRemainingPriceRevenue] =
    useState<string>("0 VND");

  const [inventory, setInventory] = useState<number>(0);
  const [codeRemaining, setCodeRemaining] = useState<number>(0);
  const [codeSold, setCodeSold] = useState<number>(0);
  const [codeTotalMoney, setCodeTotalMoney] = useState<number>(0);

  const [sold, setSold] = useState<number>(0);
  const [dataTotal, setDataTotal] = useState<IData[]>([
    {
      label: "10/7/2022",
      data: { countCreated: 2, countSold: 0, countRefund: 0 },
    },
    {
      label: "11/7/2022",
      data: { countCreated: 2, countSold: 0, countRefund: 0 },
    },
  ]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Bảng thống kê từ ngày ${format(
          new Date(start),
          "dd/MM/yyyy"
        )} tới ngày ${format(new Date(end), "dd/MM/yyyy")}`,
      },
    },
  };

  const labels = dataTotal.map((d) => d.label);
  const datasets = [
    {
      label: "Số account tạo",
      data: dataTotal.map((d) => d.data.countCreated),
      backgroundColor: "rgba(17, 241, 44, 0.5)",
    },
    {
      label: "Số account bán",
      data: dataTotal.map((d) => d.data.countSold),
      backgroundColor: "rgba(162, 162, 235, 0.5)",
    },
    {
      label: "Số account hoàn",
      data: dataTotal.map((d) => d.data.countRefund),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ];
  const data = {
    labels,
    datasets,
  };

  useEffect(() => {
    const fetch = async () => {
      const getRole = await audit.getProfile();
      setRole(getRole.data.role);
      let startDate = localStorage.getItem("startDate");
      if (startDate) {
        setStart(startDate);
        audit
          .getManagement({
            startDate: format(new Date(startDate), "yyyy/MM/dd"),
            endDate: format(new Date(end), "yyyy/MM/dd"),
          })
          .then((res) => {
            setSold(res.data.soldAccounts);
            setTotalRevenue(res.data.turnOver);
            setInventory(res.data.remainingAccounts);
            setDataTotal(res.data.data);
            setTotalRemainingPriceRevenue(res.data.totalRemainingPrice);
            setCodeRemaining(res.data.remainingGiftCode);
            setCodeSold(res.data.soldGiftCode);
            setCodeTotalMoney(res.data.totalPriceGiftCodeSold);
          });

        if ((await role) === "ADMIN") {
          audit
            .getManagementWithUser({
              startDate: format(new Date(start), "yyyy/MM/dd"),
              endDate: format(new Date(end), "yyyy/MM/dd"),
            })
            .then((res) => {
              setCtvData(res.data);
            });
        }
      }
    };
    fetch();
  }, [start, end, role]);
  return (
    <Box mt={5}>
      <Container>
        <Grid container columnSpacing={3}>
          <Grid item md={8}>
            <Card
              sx={{
                padding: "30px",
              }}
            >
              <Box
                sx={{
                  width: "600px",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",

                  justifyContent: "space-between",
                }}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  localeText={{ start: "Check-in", end: "Check-out" }}
                >
                  <DatePicker
                    label="Ngày bắt đầu"
                    value={start}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setStart(format(new Date(newValue), "MM/dd/yyyy"));
                      localStorage.setItem(
                        "startDate",
                        format(new Date(newValue), "MM/dd/yyyy")
                      );
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  Tới
                  <DatePicker
                    label="Ngày kết thúc"
                    value={end}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setEnd(format(new Date(newValue), "MM/dd/yyyy"));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Bar options={options} data={data} />
            </Card>
            <Grid container columnSpacing={2}>
              <Grid item md={3}>
                <Card
                  sx={{
                    height: "150px",
                    marginLeft: "auto",
                    marginTop: "15px",
                    padding: "15px",
                    background: "#d0d0f5",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Tổng số code còn lại
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "50px",
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      mt: "15px",
                    }}
                  >
                    <CountUp
                      start={0}
                      end={codeRemaining}
                      duration={0.5}
                      delay={0}
                    />
                  </Typography>
                </Card>
              </Grid>
              <Grid item md={3}>
                <Card
                  sx={{
                    height: "150px",
                    marginLeft: "auto",
                    marginTop: "15px",
                    padding: "15px",
                    background: "#c6c6c7",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Tổng số code đã bán
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "50px",
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      mt: "15px",
                    }}
                  >
                    <CountUp
                      start={0}
                      end={codeSold}
                      duration={0.5}
                      delay={0}
                    />
                  </Typography>
                </Card>
              </Grid>
              <Grid item md={6}>
                <Card
                  sx={{
                    height: "150px",
                    marginLeft: "auto",
                    marginTop: "15px",
                    padding: "15px",
                    background: "#d0d0f5",
                  }}
                >
                  {" "}
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Tổng số tiền nhận về từ bán code
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "40px",
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      mt: "15px",
                    }}
                  >
                    {codeTotalMoney}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item md={6}>
                <Card
                  sx={{
                    height: "150px",
                    marginLeft: "auto",
                    padding: "15px",
                    background: "#d0d0f5",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Tổng số account đã bán
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "50px",
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      mt: "15px",
                    }}
                  >
                    <CountUp start={0} end={sold} duration={0.5} delay={0} />
                  </Typography>
                </Card>
              </Grid>
              <Grid item md={6}>
                <Card
                  sx={{
                    height: "150px",
                    marginLeft: "auto",
                    padding: "15px",

                    background: "#41e5ff",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Số account còn lại
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "50px",
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                      mt: "15px",
                    }}
                  >
                    <CountUp
                      start={0}
                      end={inventory}
                      duration={0.5}
                      delay={0}
                    />
                  </Typography>
                </Card>
              </Grid>
              <Grid item md={12}>
                <Card
                  sx={{
                    height: "150px",
                    marginLeft: "auto",
                    padding: "15px",

                    background: "#ffdc5f",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    Doanh thu từ {format(new Date(start), "dd/MM/yyyy")} tới{" "}
                    {format(new Date(end), "dd/MM/yyyy")}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "40px",
                      mt: "20px",
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                    }}
                  >
                    {totalRevenue}
                  </Typography>
                </Card>
              </Grid>
              {role === "ADMIN" && (
                <Grid item md={12}>
                  <Card
                    sx={{
                      height: "150px",
                      marginLeft: "auto",
                      padding: "15px",

                      background: "#90c7ff",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                      }}
                    >
                      Tổng tiền còn tồn cho tới nay
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: "40px",
                        mt: "20px",
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                      }}
                    >
                      {totalRemainingPrice}
                    </Typography>
                  </Card>
                </Grid>
              )}

              <Grid item md={12}>
                {ctvData.length > 0 &&
                  ctvData.map((d, i) => (
                    <Box key={i} mt={2}>
                      Tháng {d.month}/{d.year}
                      <Card
                        sx={{
                          padding: "15px",
                          background: "#ccffed",
                        }}
                      >
                        {d.data.length > 0 &&
                          d.data.map((x, j) => (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              key={`${j}1`}
                            >
                              <Typography>{x.name}</Typography> -
                              <Typography>{toMoney(x.total)} VNĐ</Typography>
                            </Box>
                          ))}
                      </Card>
                    </Box>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DashboardIndex;
