import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import tagApi from "../../../../../api/tag";
import { useAppContext } from "../../../../../context/state";
import StatusBox from "../../StatusBox";
import DialogChecking from "./DialogChecking";

interface PropRerollItem {
  newPrice: number;
  status: string;
  id: string;
  name: string;
  image: string;
}

const ImageBox = styled(Box)(
  ({ theme }) => `
      height: auto;
      width: 100%;
      position:relative;
 
    `
);
const BoxPrice = styled(Box)(
  ({ theme }) => `
  width: 100%;
  background: #F7F5ED;
  padding: 10px 10px;
  border: 1px solid #DAB88F;
  border-radius: 15px;
  text-align: center;
  margin-top: 20px;
  @media (min-width: 0px) {
    margin-top: 5px;
    padding: 5px 5px;

  } 
  @media (min-width: 768px){
    margin-top: 5px;
    padding: 5px 5px;

  }
  @media (min-width: 1024px) {
    margin-top: 5px;
    padding: 5px 5px;

  } 
  @media (min-width: 1440px) {
    margin-top: 20px;
    padding: 10px 10px;
  } 
      `
);

const Sale = styled(Box)(
  ({ theme }) => `
  position: absolute;
  background: #BF0606;
  color:#fff;
  padding:2px 5px;
  font-family: "Montserrat";
  font-weight:bold;
  bottom:0;
  @media (min-width: 0px) {
    font-size:10px
  } 
  @media (min-width: 768px){
    font-size:15px
  }
      `
);
const IdProduct = styled(Box)(
  ({ theme }) => `
  position: absolute;
  background: #0A2B6D;
  color:#fff;
  padding:2px 5px;
  font-family: "Montserrat";
  font-weight:bold;
  top:0;
  right:0;
  @media (min-width: 0px) {
    font-size:10px;
    font-weight: 600;
  } 
  @media (min-width: 768px){
    font-size:10px
  }
  @media (min-width: 1024px){
    font-size:15px
  }
      `
);

function RerollItem({ image, name, newPrice, status, id }: PropRerollItem) {
  enum STATUS_OF_PRODUCT {
    STOCKING = "#1E8813",
    OUT = "#B91C1C",
  }
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { updated, handleChangeStatusToast, handleChangeMessageToast } =
    useAppContext();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleSubmitBuy = async () => {
    setLoading(true);
    tagApi
      .buyRerollAccount({ accountIds: [id] })
      .then((res) => {
        handleChangeStatusToast();
        handleChangeMessageToast("Bạn đã mua thành công");
        router.push(`/bill-reroll/${res.data[2] && res.data[2].id}`);
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        setLoading(false);
        handleChangeStatusToast();
        handleChangeMessageToast(error.response.data.message);
      });
  };

  const toMoney = (price: number) => {
    return price
      ? price
          .toString()
          .split("")
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ".") + prev;
          })
      : "0";
  };
  return (
    <Box>
      <ImageBox>
        <Box
          component={"a"}
          sx={{
            display: "flex",
            "& span": {
              width: "100% !important",
            },
          }}
          onClick={() => {
            if (status === "AVAILABLE") {
              handleClickOpen();
            }
          }}
        >
          {image && (
            <Image
              src={image}
              alt={"AccrerollImage"}
              width={320}
              height={182}
              objectFit="cover"
              className="custom-img"
              // loading="eager"
            />
          )}
        </Box>
      </ImageBox>
      {id && (
        <Box>
          <Typography
            component="h2"
            color="#2D4E96"
            sx={{
              mt: {
                lg: 2,
                xs: 0.5,
              },
              fontSize: {
                lg: "1rem",
                sm: "13px",
                xs: "10px",
              },
              minHeight: {
                lg: "50px",
                sm: "40px",
                xs: "30px",
              },
            }}
          >
            <Link href={`javascript:void(0)`} passHref>
              <a
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "2",
                  overflow: "hidden",
                }}
              >
                {name.slice(0, 70)}
                {name.length > 70 && "..."}
              </a>
            </Link>
          </Typography>
        </Box>
      )}
      <BoxPrice>
        {
          <Typography
            color={"#898989"}
            sx={{
              fontSize: {
                md: 12,
                sm: 10,
                xs: 10,
              },
            }}
          >
            {`Giá:`}
          </Typography>
        }

        <Typography
          color={"#D3A36E"}
          sx={{
            fontSize: {
              lg: 18,
              md: 15,
              sm: 10,
              xs: 10,
            },
          }}
        >
          {toMoney(+newPrice)} VND
        </Typography>
      </BoxPrice>
      <Box
        mt={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {status !== "AVAILABLE" ? (
            <StatusBox colorStatus={STATUS_OF_PRODUCT.OUT} status={status} />
          ) : (
            <StatusBox
              colorStatus={STATUS_OF_PRODUCT.STOCKING}
              status={status}
            />
          )}
        </Box>
      </Box>
      <DialogChecking
        handleClose={handleClose}
        handleSubmitBuy={handleSubmitBuy}
        openDialog={openDialog}
        loading={loading}
      />
    </Box>
  );
}

export default RerollItem;
