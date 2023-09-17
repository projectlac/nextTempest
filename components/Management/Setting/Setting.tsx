import { Box, Button, Card, CardHeader, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import banner from "../../../api/banner";

import CircularProgress from "@mui/material/CircularProgress";
import { useAppContext } from "../../../context/state";
import TriggerShowProduct from "./TriggerShowProduct";
import TokenMomo from "./TokenMomo";
import Prioritize from "./Prioritize";
function Setting() {
  const { handleChangeStatusToast, updated, handleChangeMessageToast } =
    useAppContext();
  const [numberOfImage, setNumberOfImage] = useState<number>(3);
  const [thisIsTokenMomo, setThisIsTokenMomo] = useState<string>("");

  // uu tien account cua ai len truoc
  const [prioritize, setPrioritize] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [defaultDataButton, setDefaultDataButton] = useState([
    { title: "", url: "", poster: "" },
    { title: "", url: "", poster: "" },
    { title: "", url: "", poster: "" },
    { title: "", url: "", poster: "" },
    { title: "", url: "", poster: "" },
    { title: "", url: "", poster: "" },
  ]);
  const [defaultData, setDefaultData] = useState([
    { title: "image", url: "", poster: "" },
    { title: "image", url: "", poster: "" },
    { title: "image", url: "", poster: "" },
  ]);
  const defaultItem = { title: "image", url: "", poster: "" };

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
    temp[index].title = event.target.value;
    setDefaultData(temp);
  };
  const changeUrl = (event: React.ChangeEvent<HTMLInputElement>, index) => {
    let temp = [...defaultData];
    temp[index].url = event.target.value;
    setDefaultData(temp);
  };

  const changeButtonUrl = (
    event: React.ChangeEvent<HTMLInputElement>,
    index
  ) => {
    let temp = [...defaultDataButton];
    temp[index].url = event.target.value;
    setDefaultDataButton(temp);
  };
  const changeButtonTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
    index
  ) => {
    let temp = [...defaultDataButton];
    temp[index].title = event.target.value;
    setDefaultDataButton(temp);
  };

  const submit = () => {
    let rawData = [...defaultDataButton, ...defaultData];
    let getTitle = rawData.map((d) => d.title).toString();
    let geturl = rawData.map((d) => d.url).toString();
    let getPoster = rawData.map((d) => d.poster).toString();
    let finalData = { title: getTitle, url: geturl, poster: getPoster };
    setLoading(true);
    banner
      .updateInforHomePage(finalData)
      .then((res) => {
        handleChangeMessageToast("Cập nhật thành công");
        handleChangeStatusToast();
        updated();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    banner.getInforAdmin().then((res) => {
      let index = res.data.indexOf(
        res.data.filter(
          (d) => d.id === "e7f97af1-d398-4a13-809a-e6f3349d866a"
        )[0]
      );

      let rawData = {
        title: res.data[index].title.split(","),
        url: res.data[index].url.split(","),
        poster: res.data[index].poster.split(","),
      };
      setShow(res.data[index].show);
      setThisIsTokenMomo(
        res.data.filter((d: any) => d.title === "api_momo")[0].value
      );
      setPrioritize(res.data[index].value ?? "");

      let button = [];
      let image = [];
      for (let index = 0; index < 6; index++) {
        button.push({
          title: rawData.title[index],
          url: rawData.url[index],
          poster: rawData.poster[index],
        });
      }
      for (let index = 6; index < rawData.title.length; index++) {
        image.push({
          title: rawData.title[index],
          url: rawData.url[index],
          poster: rawData.poster[index],
        });
      }
      setDefaultData(image);
      setDefaultDataButton(button);
      setNumberOfImage(rawData.title.length - 6);
      setShow(res.data[index].show);
    });
  }, []);
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
            <TextField
              fullWidth
              value={defaultDataButton[0].title}
              placeholder="Tiêu đề"
              onChange={(e: any) => {
                changeButtonTitle(e, 0);
              }}
            />
            <TextField
              fullWidth
              value={defaultDataButton[0].url}
              placeholder="Đường dẫn"
              onChange={(e: any) => {
                changeButtonUrl(e, 0);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              fullWidth
              value={defaultDataButton[1].title}
              placeholder="Tiêu đề"
              onChange={(e: any) => {
                changeButtonTitle(e, 1);
              }}
            />
            <TextField
              fullWidth
              value={defaultDataButton[1].url}
              placeholder="Đường dẫn"
              onChange={(e: any) => {
                changeButtonUrl(e, 1);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              fullWidth
              value={defaultDataButton[2].title}
              placeholder="Tiêu đề"
              onChange={(e: any) => {
                changeButtonTitle(e, 2);
              }}
            />
            <TextField
              fullWidth
              value={defaultDataButton[2].url}
              placeholder="Đường dẫn"
              onChange={(e: any) => {
                changeButtonUrl(e, 2);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              value={defaultDataButton[3].title}
              fullWidth
              placeholder="Tiêu đề"
              onChange={(e: any) => {
                changeButtonTitle(e, 3);
              }}
            />
            <TextField
              value={defaultDataButton[3].url}
              fullWidth
              placeholder="Đường dẫn"
              onChange={(e: any) => {
                changeButtonUrl(e, 3);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              fullWidth
              value={defaultDataButton[4].title}
              placeholder="Tiêu đề"
              onChange={(e: any) => {
                changeButtonTitle(e, 4);
              }}
            />
            <TextField
              fullWidth
              value={defaultDataButton[4].url}
              placeholder="Đường dẫn"
              onChange={(e: any) => {
                changeButtonUrl(e, 4);
              }}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              value={defaultDataButton[5].title}
              fullWidth
              placeholder="Tiêu đề"
              onChange={(e: any) => {
                changeButtonTitle(e, 5);
              }}
            />
            <TextField
              value={defaultDataButton[5].url}
              fullWidth
              placeholder="Đường dẫn"
              onChange={(e: any) => {
                changeButtonUrl(e, 5);
              }}
            />
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
                    {/* <TextField
                            select
                            value={defaultData[i]?.title}
                            onChange={(e: any) => handleChange(e, i)}
                          >
                            <MenuItem value={"image"}>Ảnh</MenuItem>
                            <MenuItem value={"video"}>Video</MenuItem>
                          </TextField> */}
                    <TextField
                      fullWidth
                      placeholder="Đường dẫn"
                      value={defaultData[i]?.url}
                      onChange={(e: any) => changeUrl(e, i)}
                    />
                    {i > 2 && (
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

                  {/* {defaultData[i]?.title === "video" && (
                          <TextField
                            fullWidth
                            placeholder="Đường dẫn poster"
                            value={defaultData[i]?.poster}
                            onChange={(e: any) => changePoster(e, i)}
                          />
                        )} */}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" onClick={submit}>
          {loading ? <CircularProgress /> : "Lưu"}
        </Button>
      </Box>

      <TriggerShowProduct show={show}></TriggerShowProduct>
      <Prioritize username={prioritize} />
      <TokenMomo show={thisIsTokenMomo}></TokenMomo>
    </Card>
  );
}

export default Setting;
