import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import newsApi from "../../api/newsApi";
import BGNews from "../../styles/assets/images/newsDes/BGNews.png";
import BGNewsBottom from "../../styles/assets/images/newsDes/BGNewsBottom.png";
import BGNewsTop from "../../styles/assets/images/newsDes/BGNewsTop.png";
import DownArrow from "../../styles/assets/images/newsDes/DownArrow.png";
import Paimon from "../../styles/assets/images/newsDes/Paimon.png";
import { NewsList } from "../../types/DashboardTypes/news";
import TitleHighlight from "../Common/Title/TitleHighlight";

const NewBox = styled(Box)(() => ({
  position: "relative",
  background: `url(${BGNews.src})`,
  minHeight: "750px",
  backgroundSize: "100%",
  padding: "0 50px",
  "@media (max-width: 435px)": {
    padding: "0 25px",
  },
  "&:before": {
    position: "absolute",
    content: '""',
    background: `url(${BGNewsTop.src})`,
    height: "55px",
    width: "100%",
    top: "-50px",
    left: 0,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    "@media (max-width: 435px)": {
      top: "-30px",
    },
  },
  "&:after": {
    position: "absolute",
    content: '""',
    background: `url(${BGNewsBottom.src})`,
    backgroundSize: "100%",
    height: "35px",
    width: "100%",
    bottom: "-30px",
    right: 0,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    "@media (max-width: 435px)": {
      bottom: "-20px",
    },
  },
}));
const PaimonImage = styled(Box)(
  ({ theme }) => `
    width: 541px;
    height: 723px;
    background: url(${Paimon.src});
    position: absolute;
    top: -150px;
    z-index: 9;
    right: -66px;
    background-size: 100%;
    background-repeat: no-repeat;
    @media (max-width: 1024px) {
      width: 431px;
      height: 588px;
    @media (max-width: 768px) {
      width: 336px;
      height: 466px;
    } 
    @media (max-width: 435px) {
      display:none
    }

      `
);
const HottestNews = styled(Box)(
  ({ theme }) => `
  width: 75%;
  height: auto;
  @media (max-width: 435px) {
    width: 100%;
  }
      `
);

const ShowMore = styled(Box)(
  ({ theme }) => `
  width: 100%;
  padding-top: 75px;
  text-align: center;
  @media (max-width: 435px){
    padding-top: 25px;
  },
      `
);

function MainNews() {
  const [newList, setNewList] = useState<NewsList[]>([]);
  const [index, setIndex] = useState<number>(4);
  const [total, setTotal] = useState<number>(0);
  const [newest, setNewest] = useState<NewsList[]>([
    {
      description: "",
      id: "",
      cloundinary: "",
      title: "",
      updatedAt: "",
      slug: "",
    },
  ]);

  const [offset, setOffset] = useState<number>(0);

  const getData = async (limit: number) => {
    try {
      await newsApi.getAll({ limit, offset }).then((res) => {
        const data = res.data.data;
        const newsestData = data.splice(0, 1);

        // if (data.length > 0) {
        //   console.log(newsestData);

        setNewList(data);
        setNewest(newsestData);
        setTotal(res.data.total);
        // }
      });
    } catch (error) {}
  };

  useEffect(() => {
    getData(index);
  }, []);
  const loadMore = () => {
    let newIndex = index + 4;
    getData(newIndex);
    setIndex(newIndex);
  };
  return (
    <Box pb={0}>
      <Box pt={5} pb={2}>
        <TitleHighlight
          sx={{
            marginBottom: {
              lg: "80px",
              md: "70px",
              sm: "70px",
              xs: "50px",
            },
          }}
        >
          Tin chính
        </TitleHighlight>
        <NewBox>
          <PaimonImage />
          {newest.length > 0 && (
            <HottestNews>
              <Box
                sx={{
                  border: "2px solid #b68967",
                  borderRadius: "32px",
                  padding: "5px",
                  width: "100%",
                  overflow: "hidden",
                  position: "relative",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "32px",
                    overflow: "hidden",
                  }}
                >
                  {newest[0]?.cloundinary && (
                    <Image
                      src={newest[0].cloundinary}
                      alt=""
                      layout="responsive"
                      objectFit="cover"
                      width={670.75}
                      height={363.56}
                    />
                  )}
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: { lg: "27px", md: "20px", sm: "15px" },
                  mt: 2,
                  color: "#B68967",
                }}
              >
                <Link href={`/chi-tiet-tin-tuc/${newest[0]?.slug}`}>
                  {newest[0]?.title}
                </Link>
              </Typography>
            </HottestNews>
          )}

          <Grid container>
            {newList.length > 0 &&
              newList.map((d, i) => (
                <Box
                  sx={{ display: { sm: "flex", xs: "block" }, width: "100%" }}
                  mb={2}
                  mt={2}
                  key={i}
                >
                  <Grid item md={4} sm={4} xs={12}>
                    <Box
                      sx={{
                        border: "2px solid #C9AD97",
                        width: "100%",
                        position: "relative",
                        height: "auto",
                        padding: "5px",
                      }}
                    >
                      <Image
                        src={d.cloundinary}
                        alt=""
                        layout="responsive"
                        objectFit="contain"
                        width={288}
                        height={180}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={8} sm={8} xs={12}>
                    <Box sx={{ px: { sm: 3, xs: 0 } }}>
                      <Typography
                        sx={{
                          fontSize: { lg: "20px", md: "17px", sm: "13px" },
                          mt: 2,
                          color: "#B68967",
                        }}
                      >
                        <Link href={`/chi-tiet-tin-tuc/${d.slug}`}>
                          {d.title}
                        </Link>
                      </Typography>

                      <Typography
                        sx={{
                          color: "#8f8c8a",
                          fontSize: { lg: "17px", md: "15px", sm: "11px" },
                          my: 2,
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        {d.description}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#8f8c8a",
                          fontSize: { lg: "15px", md: "13px", sm: "11px" },
                        }}
                      >
                        <Link
                          href={`/chi-tiet-tin-tuc/${d.slug}`}
                        >{`Xem thêm>>`}</Link>
                      </Typography>
                    </Box>
                  </Grid>
                </Box>
              ))}
          </Grid>
        </NewBox>

        <ShowMore>
          {total > newList.length + 1 && (
            <Box onClick={loadMore}>
              <Typography
                color="#E3DDD3"
                sx={{ fontSize: { lg: "18px", md: "16px", sm: "13px" } }}
              >
                Xem thêm tin tức
              </Typography>
              <Box>
                <Image src={DownArrow} alt="" width={65} height={65} />
              </Box>
            </Box>
          )}
        </ShowMore>
      </Box>
    </Box>
  );
}

export default MainNews;
