import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BGNews from "../../../styles/assets/images/newsDes/BGNews.png";
import BGNewsBottom from "../../../styles/assets/images/newsDes/BGNewsBottom.png";
import BGNewsTop from "../../../styles/assets/images/newsDes/BGNewsTop.png";
import TitleHighlight from "../../Common/Title/TitleHighlight";
import yourLogo from "../../../styles/assets/images/Reputation/11111.jpg";
import yourLogo1 from "../../../styles/assets/images/Reputation/1.jpg";
import yourLogo2 from "../../../styles/assets/images/Reputation/2.jpg";
import yourLogo3 from "../../../styles/assets/images/Reputation/3.jpg";
import yourLogo4 from "../../../styles/assets/images/Reputation/4.jpg";
import yourLogo5 from "../../../styles/assets/images/Reputation/5.jpg";
import yourLogo8 from "../../../styles/assets/images/Reputation/7.jpg";
import yourLogo9 from "../../../styles/assets/images/Reputation/8.jpg";
import yourLogo10 from "../../../styles/assets/images/Reputation/9.jpg";

import yourLogo6 from "../../../styles/assets/images/Reputation/6.png";
import yourLogo7 from "../../../styles/assets/images/Reputation/channels4_profile.jpg";

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

function MainNews() {
  return (
    <Box pb={0}>
      <Box pt={15} pb={15}>
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
          Check Uy Tín Shop
        </TitleHighlight>
        <NewBox>
          <Grid container columnSpacing={3} rowSpacing={3}>
            <Grid item md={4} xs={12}>
              <Box
                sx={{
                  "& div.video": {
                    position: "relative",
                    height: "0%",
                    borderRadius: "5px",
                    overflow: "hidden",
                    paddingBottom: { md: `50.3%`, xs: "56.25%" },
                    "& iframe": {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    },
                  },
                }}
              >
                <Box className="video">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/-reYEpc_NrI"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
                <Box
                  display={"flex"}
                  sx={{
                    padding: "15px",
                    borderRadius: "5px",
                    width: "auto",
                    background: "#fff",
                    margin: "0 auto",

                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      background: `url(${yourLogo.src})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    ml={3}
                    textAlign="left"
                    sx={{
                      display: { md: "flex", xs: "block" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "calc(100% - 50px)",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { md: "15px", xs: "13px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "17px", xs: "13px" },
                          fontWeight: "bold",
                        }}
                      >
                        F2P Impact Official
                      </Typography>
                      @F2PImpactOfficial <br /> 45,1 N người đăng ký
                    </Box>
                    <Box>
                      <a
                        href="https://www.youtube.com/@F2PImpactOfficial"
                        target="__blank"
                      >
                        <Button color="error" variant="contained">
                          Subscribe now
                        </Button>
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box
                sx={{
                  "& div.video": {
                    position: "relative",
                    height: "0%",
                    borderRadius: "5px",
                    overflow: "hidden",
                    paddingBottom: { md: `50.3%`, xs: "56.25%" },
                    "& iframe": {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    },
                  },
                }}
              >
                <Box className="video">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/P464b8y4Ttw"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
                <Box
                  display={"flex"}
                  sx={{
                    padding: "15px",
                    borderRadius: "5px",
                    width: "auto",
                    background: "#fff",
                    margin: "0 auto",

                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      background: `url(${yourLogo7.src})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    ml={3}
                    textAlign="left"
                    sx={{
                      display: { md: "flex", xs: "block" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "calc(100% - 50px)",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { md: "15px", xs: "13px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "17px", xs: "13px" },
                          fontWeight: "bold",
                        }}
                      >
                        Chunpomer
                      </Typography>
                      @chunpomer <br /> 4,47 N người đăng ký
                    </Box>
                    <Box>
                      <a
                        href="https://www.youtube.com/@chunpomer"
                        target="__blank"
                      >
                        <Button color="error" variant="contained">
                          Subscribe now
                        </Button>
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box
                sx={{
                  "& div.video": {
                    position: "relative",
                    height: "0%",
                    borderRadius: "5px",
                    overflow: "hidden",
                    paddingBottom: { md: `50.3%`, xs: "56.25%" },
                    "& iframe": {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    },
                  },
                }}
              >
                <Box className="video">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/xp8WsPGBj9I"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
                <Box
                  display={"flex"}
                  sx={{
                    padding: "15px",
                    borderRadius: "5px",
                    width: "auto",
                    background: "#fff",
                    margin: "0 auto",

                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      background: `url(${yourLogo8.src})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    ml={3}
                    textAlign="left"
                    sx={{
                      display: { md: "flex", xs: "block" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "calc(100% - 50px)",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { md: "15px", xs: "13px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "17px", xs: "13px" },
                          fontWeight: "bold",
                        }}
                      >
                        toàn mega
                      </Typography>
                      @toanmega <br /> 4,91 N người đăng ký
                    </Box>
                    <Box>
                      <a
                        href="https://www.youtube.com/@toanmega"
                        target="__blank"
                      >
                        <Button color="error" variant="contained">
                          Subscribe now
                        </Button>
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  "& div.video": {
                    position: "relative",
                    height: "0%",
                    borderRadius: "5px",
                    overflow: "hidden",
                    paddingBottom: { md: `50.3%`, xs: "56.25%" },
                    "& iframe": {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    },
                  },
                }}
              >
                <Box className="video">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/kNNSvFD4Wek"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
                <Box
                  display={"flex"}
                  sx={{
                    padding: "15px",
                    borderRadius: "5px",
                    width: "auto",
                    background: "#fff",
                    margin: "0 auto",

                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      background: `url(${yourLogo9.src})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    ml={3}
                    textAlign="left"
                    sx={{
                      display: { md: "flex", xs: "block" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "calc(100% - 50px)",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { md: "15px", xs: "13px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "17px", xs: "13px" },
                          fontWeight: "bold",
                        }}
                      >
                        Kitakara Tome Ch. 黄宝石 留【 Vtuber 】
                      </Typography>
                      @KitakaraTome <br /> 12 N người đăng ký
                    </Box>
                    <Box>
                      <a
                        href="https://www.youtube.com/@KitakaraTome"
                        target="__blank"
                      >
                        <Button color="error" variant="contained">
                          Subscribe now
                        </Button>
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  "& div.video": {
                    position: "relative",
                    height: "0%",
                    borderRadius: "5px",
                    overflow: "hidden",
                    paddingBottom: { md: `50.3%`, xs: "56.25%" },
                    "& iframe": {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    },
                  },
                }}
              >
                <Box className="video">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/kNNSvFD4Wek"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
                <Box
                  display={"flex"}
                  sx={{
                    padding: "15px",
                    borderRadius: "5px",
                    width: "auto",
                    background: "#fff",
                    margin: "0 auto",

                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      background: `url(${yourLogo9.src})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    ml={3}
                    textAlign="left"
                    sx={{
                      display: { md: "flex", xs: "block" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "calc(100% - 50px)",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { md: "15px", xs: "13px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "17px", xs: "13px" },
                          fontWeight: "bold",
                        }}
                      >
                        Bót-chan UwU
                      </Typography>
                      @botchanuwuofficial <br /> 11,5 N người đăng ký
                    </Box>
                    <Box>
                      <a
                        href="https://www.youtube.com/@botchanuwuofficial"
                        target="__blank"
                      >
                        <Button color="error" variant="contained">
                          Subscribe now
                        </Button>
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  "& div.video": {
                    position: "relative",
                    height: "0%",
                    borderRadius: "5px",
                    overflow: "hidden",
                    paddingBottom: { md: `50.3%`, xs: "56.25%" },
                    "& iframe": {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "175px",
                    background: `url(${yourLogo1.src})`,
                    backgroundSize: "cover",
                  }}
                ></Box>

                <Box
                  display={"flex"}
                  sx={{
                    padding: "15px",
                    borderRadius: "5px",
                    width: "auto",
                    background: "#fff",
                    margin: "0 auto",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      background: `url(${yourLogo2.src})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    ml={1}
                    textAlign="left"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "calc(100% - 70px)",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { md: "15px", xs: "13px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "20px", xs: "13px" },
                          fontWeight: "bold",
                        }}
                      >
                        <a
                          href="https://www.facebook.com/HSRQuotes"
                          target="__blank"
                        >
                          Honkai: Star Rail Việt Nam Quotes
                        </a>
                      </Typography>
                      29K lượt thích • 37K người theo dõi
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  "& div.video": {
                    position: "relative",
                    height: "0%",
                    borderRadius: "5px",
                    overflow: "hidden",
                    paddingBottom: { md: `50.3%`, xs: "56.25%" },
                    "& iframe": {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "175px",
                    background: `url(${yourLogo3.src})`,
                    backgroundSize: "cover",
                  }}
                ></Box>

                <Box
                  display={"flex"}
                  sx={{
                    padding: "15px",
                    borderRadius: "5px",
                    width: "auto",
                    background: "#fff",
                    margin: "0 auto",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      background: `url(${yourLogo4.src})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    ml={1}
                    textAlign="left"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "calc(100% - 70px)",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { md: "15px", xs: "13px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "20px", xs: "13px" },
                          fontWeight: "bold",
                        }}
                      >
                        <a
                          href="https://www.facebook.com/Paimon2Quotes"
                          target="__blank"
                        >
                          Genshin Impact - Tips & Facts
                        </a>
                      </Typography>
                      101K lượt thích • 145K người theo dõi
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>{" "}
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  "& div.video": {
                    position: "relative",
                    height: "0%",
                    borderRadius: "5px",
                    overflow: "hidden",
                    paddingBottom: { md: `50.3%`, xs: "56.25%" },
                    "& iframe": {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "175px",
                    background: `url(${yourLogo5.src})`,
                    backgroundSize: "cover",
                  }}
                ></Box>

                <Box
                  display={"flex"}
                  sx={{
                    padding: "15px",
                    borderRadius: "5px",
                    width: "auto",
                    background: "#fff",
                    margin: "0 auto",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      background: `url(${yourLogo6.src})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    ml={1}
                    textAlign="left"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "calc(100% - 70px)",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { md: "15px", xs: "13px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "20px", xs: "13px" },
                          fontWeight: "bold",
                        }}
                      >
                        <a
                          href="https://www.facebook.com/WutheringWaves.Vi"
                          target="__blank"
                        >
                          Wuthering Waves - Tips & Facts
                        </a>
                      </Typography>
                      @WutheringWaves.Vi · Trò chơi điện tử
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  "& div.video": {
                    position: "relative",
                    height: "0%",
                    borderRadius: "5px",
                    overflow: "hidden",
                    paddingBottom: { md: `50.3%`, xs: "56.25%" },
                    "& iframe": {
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "175px",
                    background: `url(${yourLogo3.src})`,
                    backgroundSize: "cover",
                  }}
                ></Box>

                <Box
                  display={"flex"}
                  sx={{
                    padding: "15px",
                    borderRadius: "5px",
                    width: "auto",
                    background: "#fff",
                    margin: "0 auto",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "50px",
                      height: "50px",

                      borderRadius: "50%",
                      background: `url(${yourLogo4.src})`,
                      backgroundSize: "cover",
                    }}
                  />
                  <Box
                    ml={1}
                    textAlign="left"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "calc(100% - 70px)",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { md: "15px", xs: "13px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: "20px", xs: "13px" },
                          fontWeight: "bold",
                        }}
                      >
                        <a
                          href="https://www.facebook.com/paimon2quotes2"
                          target="__blank"
                        >
                          Genshin Impact - Tips & Facts 2
                        </a>
                      </Typography>
                      16K lượt thích • 19K người theo dõi
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </NewBox>
      </Box>
    </Box>
  );
}

export default MainNews;
