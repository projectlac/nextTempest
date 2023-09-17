/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import audit from "../../api/audit";
import Navbar from "../Management/Nav/Navbar";
export default function DashboardLayout({ children }) {
  const router = useRouter();
  React.useEffect(() => {
    const profile = async () => {
      const res = await audit.getProfile();

      if (
        (res.data.role !== "ADMIN" &&
          res.data.role !== "CHECKED" &&
          res.data.role !== "MOD") ||
        !res.data
      ) {
        router.push("/");
      }
    };

    profile();
  }, []);
  return (
    <>
      <Box>
        <Navbar />
        <Box>
          <main>{children}</main>
        </Box>
      </Box>
    </>
  );
}
