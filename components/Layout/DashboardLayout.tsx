/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Navbar from "../Management/Nav/Navbar";
import jwt_decode from "jwt-decode";
import React from "react";
export default function DashboardLayout({ children }) {
  const router = useRouter();
  React.useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (
      (token &&
        jwt_decode<any>(token).role !== "ADMIN" &&
        jwt_decode<any>(token).role !== "CHECKED" &&
        jwt_decode<any>(token).role !== "MOD") ||
      !token
    ) {
      router.push("/");
    }
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
