import { Box } from "@mui/material";
import Navbar from "../Management/Nav/Navbar";

export default function DashboardLayout({ children }) {
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
