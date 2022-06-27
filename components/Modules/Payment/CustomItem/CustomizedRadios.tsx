import * as React from "react";
import { styled } from "@mui/material/styles";
import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 25,
  height: 25,

  backgroundColor: "#BFAE9B",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 25,
    height: 25,
    backgroundImage: "radial-gradient(#FBF1E5,#FBF1E5 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#DAB88F",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#BFAE9B",

  "&:before": {
    display: "block",
    width: 25,
    height: 25,
    background: "#d33",
    backgroundImage: "radial-gradient(#726550,#726550 28%, #BFAE9B 32%)",
    backgroundColor: "#BFAE9B",
    borderRadius: "50%",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#DAB88F",
  },
});

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
interface PropsRadio {
  handleValue: (data: string) => void;
}
export default function CustomizedRadios({ handleValue }: PropsRadio) {
  return (
    <FormControl>
      <RadioGroup
        defaultValue="momo"
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
        onChange={(e) => handleValue(e.target.value)}
      >
        <FormControlLabel
          sx={{
            color: "#726550",
            "& span": {
              fontSize: {
                md: "1rem",
                xs: "14px",
              },
            },
          }}
          value="bank"
          control={<BpRadio />}
          label="Chuyển khoản ngân hàng."
        />
        <FormControlLabel
          sx={{
            color: "#726550",
            "& span": {
              fontSize: {
                md: "1rem",
                xs: "14px",
              },
            },
          }}
          value="paypal"
          control={<BpRadio />}
          label="Thanh toán qua Paypal."
        />
        <FormControlLabel
          sx={{
            color: "#726550",
            "& span": {
              fontSize: {
                md: "1rem",
                xs: "14px",
              },
            },
          }}
          value="momo"
          control={<BpRadio />}
          label="Chuyển khoản ví Momo."
        />
      </RadioGroup>
    </FormControl>
  );
}
