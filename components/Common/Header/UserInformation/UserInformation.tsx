import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Avatar, Badge, Box, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgChevronDoubleRight } from "react-icons/cg";
import audit from "../../../../api/audit";
import avatar from "../../../../data/avatar";
import toMoney from "../../../../utility/toMoney";
import { styled } from "@mui/material/styles";
interface ICart {
  openCart: boolean;
  wrapperRef: any;
}
interface IUser {
  avatar: number;
  email: string;
  username: string;
  money: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function UserInfo({ openCart, wrapperRef }: ICart) {
  const [user, setUser] = useState<IUser>({
    avatar: 0,
    email: "",
    username: "",
    money: "",
  });
  useEffect(() => {
    audit.getProfile().then((res) => {
      const {
        confirmedEmail,
        createdAt,
        id,
        isDeleted,
        isRecievePost,
        phone,
        updatedAt,
        role,
        ...data
      } = res.data;
      setUser(data);
    });
  }, [openCart]);

  const findIndexByID = (id: number) => {
    const find = avatar.filter((d) => d.id === id)[0];
    const index = avatar.indexOf(find);
    return avatar[index]?.url;
  };

  const processEmail = (email: string) => {
    const reEmail = email.split("@");
    if (reEmail[0].length > 7) {
      return reEmail[0].slice(0, 4) + "***@" + reEmail[1];
    }
    return email;
  };
  return (
    <Box
      width={250}
      height={100}
      className="box-wishlist"
      sx={{
        background: "#fff",
        position: "absolute",
        height: "160px",
        right: 0,
        top: "40px",
        border: "4px solid #3b5898",
        flexDirection: "column",
        display: `${openCart ? "flex" : "none"}`,
        padding: "7px ",
      }}
      ref={wrapperRef}
    >
      <ArrowDropUpIcon
        sx={{
          color: "#fff",
          position: "absolute",
          top: "-14px",
          right: "0px",
        }}
      />
      <Box
        height={56}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt={user.username}
            src={findIndexByID(user.avatar)}
          />
        </StyledBadge>
        <Box ml={1}>
          <Typography
            fontSize={15}
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 700,
            }}
          >
            Xin chào: {user.username}
          </Typography>
          <Typography
            fontSize={12}
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontStyle: "italic",
              color: "#8a8a8a",
            }}
          >
            {processEmail(user.email)}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={14}
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
          }}
        >
          Smile Coin: {toMoney(+user.money)}
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box>
        <Typography
          fontSize={14}
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href="/nap-tien?tab=user">
            <a>
              Chi tiết tài khoản <CgChevronDoubleRight />
            </a>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default UserInfo;
