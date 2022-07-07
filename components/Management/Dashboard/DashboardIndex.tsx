import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { fontWeight } from "@mui/system";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import TextField from "@mui/material/TextField";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import toMoney from "../../../utility/toMoney";
import CountUp from "react-countup";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardIndex() {
  const [start, setStart] = React.useState<string | null>("07/10/2022");
  const [end, setEnd] = React.useState<string | null>("07/15/2022");

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
  const fakeData = [
    { label: "10/7/2022", data: [24, 2, 7] },
    { label: "11/7/2022", data: [12, 4, 12] },
    { label: "12/7/2022", data: [3, 4, 3] },
    { label: "13/7/2022", data: [14, 2, 8] },
    { label: "14/7/2022", data: [23, 2, 9] },
    { label: "15/7/2022", data: [28, 21, 10] },
  ];

  const labels = fakeData.map((d) => d.label);
  const datasets = [
    {
      label: "Tạo",
      data: fakeData.map((d) => d.data[0]),
      backgroundColor: "rgba(17, 241, 44, 0.5)",
    },
    {
      label: "Mua",
      data: fakeData.map((d) => d.data[1]),
      backgroundColor: "rgba(162, 162, 235, 0.5)",
    },
    {
      label: "Hoàn",
      data: fakeData.map((d) => d.data[2]),
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
                    label="Ngày bắt đầu"
                    value={start}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setStart(format(new Date(newValue), "MM/dd/yyyy"));
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
                    <CountUp start={0} end={123} duration={0.5} delay={0} />
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
                    <CountUp start={0} end={123} duration={0.5} delay={0} />
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
                    {toMoney(123000000)} VND
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
