import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

function index() {
  const [numberOfImage, setNumberOfImage] = useState<number>(1);
  const [defaultData, setDefaultData] = useState([
    { type: "image", url: "", poster: "" },
  ]);
  const defaultItem = { type: "image", url: "", poster: "" };

  const addItem = () => {
    setNumberOfImage((prev) => prev + 1);
    let temp = [...defaultData, defaultItem];
    setDefaultData(temp);
  };
  const removeItem = (index: number) => {
    setNumberOfImage((prev) => prev - 1);
    let temp = [...defaultData];
    temp.splice(index, 1);
    setDefaultData(temp);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index) => {
    let temp = [...defaultData];
    temp[index].type = event.target.value;
    setDefaultData(temp);
  };
  return (
    <DashboardLayout>
      <Head>
        <title>Cài đặt</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box mt={3}>
        <Container>
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
              title="Cài đặt"
            />
            <Box
              sx={{
                p: 3,
                "& .MuiTextField-root": {
                  marginBottom: "10px",
                },
              }}
            >
              Cụm nút
              <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid item md={4}>
                  <TextField fullWidth placeholder="Tiêu đề" />
                  <TextField fullWidth placeholder="Đường dẫn" />
                </Grid>
                <Grid item md={4}>
                  <TextField fullWidth placeholder="Tiêu đề" />
                  <TextField fullWidth placeholder="Đường dẫn" />
                </Grid>
                <Grid item md={4}>
                  <TextField fullWidth placeholder="Tiêu đề" />
                  <TextField fullWidth placeholder="Đường dẫn" />
                </Grid>
                <Grid item md={4}>
                  <TextField fullWidth placeholder="Tiêu đề" />
                  <TextField fullWidth placeholder="Đường dẫn" />
                </Grid>
                <Grid item md={4}>
                  <TextField fullWidth placeholder="Tiêu đề" />
                  <TextField fullWidth placeholder="Đường dẫn" />
                </Grid>
                <Grid item md={4}>
                  <TextField fullWidth placeholder="Tiêu đề" />
                  <TextField fullWidth placeholder="Đường dẫn" />
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                p: 3,
                "& .MuiTextField-root": {
                  marginBottom: "10px",
                },
              }}
            >
              <Box sx={{ mb: 2 }}>
                Cụm ảnh{" "}
                <Button variant="contained" onClick={addItem}>
                  Thêm
                </Button>
              </Box>
              <Grid container columnSpacing={2} rowSpacing={2}>
                {[...Array(numberOfImage)].map((d, i) => (
                  <Grid item md={4} key={i}>
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            select
                            value={defaultData[i]?.type}
                            onChange={(e: any) => handleChange(e, i)}
                          >
                            <MenuItem value={"image"}>Ảnh</MenuItem>
                            <MenuItem value={"video"}>Video</MenuItem>
                          </TextField>
                          {i !== 0 && (
                            <Button
                              variant="contained"
                              color="error"
                              sx={{ ml: 2 }}
                              onClick={() => removeItem(i)}
                            >
                              Xóa
                            </Button>
                          )}
                        </Box>
                        <TextField
                          fullWidth
                          placeholder="Đường dẫn"
                          value={defaultData[i]?.url}
                        />
                        {defaultData[i]?.type === "video" && (
                          <TextField
                            fullWidth
                            placeholder="Đường dẫn poster"
                            value={defaultData[i]?.poster}
                          />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Button variant="contained">Lưu</Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
index.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default index;
