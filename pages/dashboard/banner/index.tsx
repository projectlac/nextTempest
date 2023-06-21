import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import banner from "../../../api/banner";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { useAppContext } from "../../../context/state";

function Banner() {
  const [file, setFile] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<FileList>();
  const [fileListCurreny, setFileListCurreny] = useState<string[]>();

  const { handleChangeMessageToast, updated, update, handleChangeStatusToast } =
    useAppContext();
  const uploadMultiFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileObj = [];
    let fileArray = [];

    fileObj.push(e.target.files);

    setFileList(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }

    setFile(fileArray);
  };

  const onSubmit = () => {
    const hanndeOnSubmit = async () => {
      setLoading(true);
      const formData = new FormData();
      for (let index = 0; index < 3; index++) {
        formData.append("files", fileList[index]);
      }
      try {
        await banner
          .uploadBanner(formData)
          .then(() => {
            handleChangeMessageToast("Cập nhật banner thành công!");
            handleChangeStatusToast();
            updated();
          })
          .catch(() => {
            handleChangeMessageToast("Có lỗi xảy ra, vui lòng thử lại!");
            handleChangeStatusToast();
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {}
    };
    hanndeOnSubmit();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await banner.getBanner().then((res) => {
          const data = res.data.map((d) => d.url);
          setFileListCurreny(data);
        });
      } catch (error) {}
    };
    getData();
  }, [update]);
  return (
    <DashboardLayout>
      <Head>
        <title>Banner</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box mt={3}>
        <Container>
          <Card>
            <Box p={3} textAlign={"center"}>
              Vui lòng chọn ảnh theo thứ tự <br />
              Banner nhân vật 1 - Banner nhân vật 2 (nếu có) - Banner vũ khí
              <br /> Kích thước chuẩn : 2244 x 1146
              <Box mt={3}>
                <Button variant="contained" component="label">
                  Upload banner
                  <input
                    type="file"
                    accept="image/*"
                    name="file"
                    required
                    hidden
                    multiple
                    onChange={uploadMultiFile}
                  />
                </Button>
                <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
                  {(file || []).map((d, index) => (
                    <Box key={index} mx={3}>
                      <Image
                        src={d}
                        alt=""
                        width={300}
                        height={300}
                        objectFit="contain"
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box mt={3}>
                <Button variant="outlined" onClick={onSubmit}>
                  {loading ? <CircularProgress /> : "  Xác nhận"}
                </Button>
              </Box>
            </Box>
            <Divider></Divider>
            <Box>
              <Typography textAlign={"center"} fontSize={20} my={3}>
                {" "}
                Thông báo
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "15px",
                }}
              >
                {(fileListCurreny || []).map((d) => (
                  <Box key={d} mx={3}>
                    <Image
                      src={d}
                      alt=""
                      width={300}
                      height={300}
                      objectFit="contain"
                    ></Image>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
    </DashboardLayout>
  );
}

export default Banner;
Banner.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
