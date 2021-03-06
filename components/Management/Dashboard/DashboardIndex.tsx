import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { Bar } from "react-chartjs-2";
import CountUp from "react-countup";
import toMoney from "../../../utility/toMoney";
import audit from "../../../api/audit";
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

  const [start, setStart] = React.useState<string | null>(date1);
  const [end, setEnd] = React.useState<string | null>(
    format(new Date(), "MM/dd/yyyy")
  );

  const [totalRevenue, setTotalRevenue] = useState<string>("0 VND");
  const [inventory, setInventory] = useState<number>(0);
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
  useEffect(() => {
    audit
      .getManagement({
        startDate: format(new Date(start), "yyyy/MM/dd"),
        endDate: format(new Date(end), "yyyy/MM/dd"),
      })
      .then((res) => {
        setSold(res.data.soldAccounts);
        setTotalRevenue(res.data.turnOver);
        setInventory(res.data.remainingAccounts);
        setDataTotal(res.data.data);
      });
  }, [start, end]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `B???ng th???ng k?? t??? ng??y ${format(
          new Date(start),
          "dd/MM/yyyy"
        )} t???i ng??y ${format(new Date(end), "dd/MM/yyyy")}`,
      },
    },
  };

  const labels = dataTotal.map((d) => d.label);
  const datasets = [
    {
      label: "S??? account t???o",
      data: dataTotal.map((d) => d.data.countCreated),
      backgroundColor: "rgba(17, 241, 44, 0.5)",
    },
    {
      label: "S??? account b??n",
      data: dataTotal.map((d) => d.data.countSold),
      backgroundColor: "rgba(162, 162, 235, 0.5)",
    },
    {
      label: "S??? account ho??n",
      data: dataTotal.map((d) => d.data.countRefund),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ];
  const data = {
    labels,
    datasets,
  };
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
                    label="Ng??y b???t ?????u"
                    value={start}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setStart(format(new Date(newValue), "MM/dd/yyyy"));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  T???i
                  <DatePicker
                    label="Ng??y k???t th??c"
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
                    T???ng s??? account ???? b??n
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
                    S??? account c??n l???i
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
                    Doanh thu t??? {format(new Date(start), "dd/MM/yyyy")} t???i{" "}
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
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DashboardIndex;
