import React from "react";
import TitleHighlightFornite from "../Common/Title/TitleHighlightFornite";
import { Box, Grid } from "@mui/material";
import Image1 from "../../styles/assets/images/CategoryHome/category_reroll_tempest.png";
import Image2 from "../../styles/assets/images/CategoryHome/category_reroll_vip_tempest.png";

import Image3 from "../../styles/assets/images/CategoryHome/code_tempest.png";

import Image4 from "../../styles/assets/images/CategoryHome/luckySpin_tempest.png";
import Link from "next/link";

function NewCategoryIndex() {
  return (
    <div>
      <TitleHighlightFornite>HoYoverse Game</TitleHighlightFornite>
      <Box mt={4} mb={3}>
        <Grid container spacing={3}>
          <Grid item md={3} sm={3} xs={6}>
            <Link href="/random" passHref>
              <Box
                sx={{
                  width: "100%",
                  height: { md: "415px", xs: "300px" },
                  background: `url(${Image1.src})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                  transition: "all 0.3s ease-out",
                  "&:hover": {
                    transform: "translateY(-15px)",
                    filter: "drop-shadow(0px 0px 6px #2B78BB)",
                  },
                }}
              ></Box>
            </Link>
          </Grid>
          <Grid item md={3} sm={3} xs={6}>
            <Link href="/404" passHref>
              <Box
                sx={{
                  width: "100%",
                  height: { md: "415px", xs: "300px" },
                  background: `url(${Image2.src})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                  transition: "all 0.3s ease-out",
                  "&:hover": {
                    transform: "translateY(-15px)",
                    filter: "drop-shadow(0px 0px 6px #2B78BB)",
                  },
                }}
              ></Box>
            </Link>
          </Grid>
          <Grid item md={3} sm={3} xs={6}>
            <Link href="/404" passHref>
              <Box
                sx={{
                  width: "100%",
                  height: { md: "415px", xs: "300px" },
                  background: `url(${Image3.src})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                  transition: "all 0.3s ease-out",
                  "&:hover": {
                    transform: "translateY(-15px)",
                    filter: "drop-shadow(0px 0px 6px #2B78BB)",
                  },
                }}
              ></Box>
            </Link>
          </Grid>
          <Grid item md={3} sm={3} xs={6}>
            <Link href="/404" passHref>
              <Box
                sx={{
                  width: "100%",
                  height: { md: "415px", xs: "300px" },
                  background: `url(${Image4.src})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                  transition: "all 0.3s ease-out",
                  "&:hover": {
                    transform: "translateY(-15px)",
                    filter: "drop-shadow(0px 0px 6px #2B78BB)",
                  },
                }}
              ></Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default NewCategoryIndex;
