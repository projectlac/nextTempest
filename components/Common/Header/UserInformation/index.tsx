import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import UserInfo from "./UserInformation";
import { useAppContext } from "../../../../context/state";

function useOutsideAlerter(ref, closeCart) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeCart();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

export default function UserInformation() {
  const [openCart, setOpenCart] = useState<boolean>(false);
  const closeCart = () => {
    setOpenCart(false);
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeCart);
  const { isLogin } = useAppContext();
  return (
    <>
      {isLogin && (
        <Box
          sx={{
            marginRight: "15px",
            border: "1px solid #fff",
            borderRadius: "999px",
            padding: "5px",
            display: "flex",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => {
            setOpenCart(!openCart);
          }}
        >
          <PersonIcon sx={{ color: "#fff", transform: "scale(0.8)" }} />
          <UserInfo openCart={openCart} wrapperRef={wrapperRef} />
        </Box>
      )}
    </>
  );
}
