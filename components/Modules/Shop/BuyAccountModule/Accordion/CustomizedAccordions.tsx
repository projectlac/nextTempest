import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import tagApi from "../../../../../api/tag";
import { TAG_TYPE } from "../../../../../types/account";
import { useAppContext } from "../../../../../context/state";

interface AccordionProp {
  title: string;
  data: any;
  handleFilter: (data: string, active: boolean, title: string) => void;
  open: boolean;
}

interface RadioProp {
  title: string;
  data: any;
  handleChangeServer: (data: string) => void;
  open: boolean;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `none`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
  />
))(({ theme }) => ({
  padding: 0,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgb(255, 255, 255, )" : "rgb(0, 0, 0, )",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(0),
  },
}));

const CheckboxCustom = styled(FormControlLabel)(({ theme }) => ({
  "& span": {
    fontFamily: "Montserrat",
    fontSize: "16px",
    "@media (min-width:0)": {
      fontSize: "14px",
    },
    "@media (min-width: 768px)": {
      fontSize: "16px",
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderTop: "none",
}));

const RenderItem = ({ title, data, handleFilter, open }: AccordionProp) => {
  const [expanded, setExpanded] = React.useState<boolean | false>(open);

  const handleChange =
    () => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(!expanded);
    };

  const handleChoose = (e: React.ChangeEvent<HTMLInputElement>, data) => {
    handleFilter(data, e.target.checked, title);
  };

  return (
    <Box>
      <Accordion expanded={expanded === true} onChange={handleChange()}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography
            sx={{
              fontSize: {
                md: "16px",
                xs: "14px",
              },
            }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {(data || []).map((d) => (
              <CheckboxCustom
                key={d.id}
                control={<Checkbox />}
                label={d.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChoose(e, d.slug);
                }}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const RadioItem = ({ title, data, handleChangeServer, open }: RadioProp) => {
  const [expanded, setExpanded] = React.useState<boolean | false>(open);

  const handleChange =
    () => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(!expanded);
    };

  const handleChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeServer(e.target.value);
  };

  return (
    <Box>
      <Accordion expanded={expanded === true} onChange={handleChange()}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography
            sx={{
              fontSize: {
                md: "16px",
                xs: "14px",
              },
            }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={handleChoose}
            >
              <FormControlLabel
                value=""
                control={<Radio />}
                sx={{
                  "& span": {
                    fontFamily: "Montserrat",
                    fontSize: {
                      md: "16px",
                      xs: "14px",
                    },
                  },
                }}
                label="Tất cả"
              />
              {(data || []).map((d) => (
                <FormControlLabel
                  key={d.id}
                  value={d.title}
                  control={<Radio />}
                  sx={{
                    "& span": {
                      fontFamily: "Montserrat",
                      fontSize: {
                        md: "16px",
                        xs: "14px",
                      },
                    },
                  }}
                  label={d.title}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default function CustomizedAccordions() {
  const { updated, handleSelectedFilter } = useAppContext();
  const [listData, setListData] = React.useState([]);
  React.useEffect(() => {
    const getData = async () => {
      try {
        await tagApi.getTag("").then((res) => {
          setListData(res.data);
        });
      } catch (error) {}
    };
    getData();
  }, []);

  const [selectedFilter, setSelectedFilter] = React.useState({
    server: "",
    character: [],
    weapon: [],
  });
  const handleFilter = (data: string, active: boolean, title: string) => {
    const tempSelected = { ...selectedFilter };
    const key = title.toLowerCase();
    if (active) {
      tempSelected[key].push(data);
      setSelectedFilter(tempSelected);
    } else {
      const index = tempSelected[key].indexOf(data);
      if (index !== -1) {
        tempSelected[key].splice(index, 1);
        setSelectedFilter(tempSelected);
      }
    }
    handleSelectedFilter(selectedFilter);
    updated();
  };

  const handleChangeServer = (data: string) => {
    const tempSelected = { ...selectedFilter };
    tempSelected.server = data;
    setSelectedFilter(tempSelected);
    handleSelectedFilter(tempSelected);
    updated();
  };
  return (
    <Box
      sx={{
        height: { md: "1200px", xs: "400px" },
        overflow: "hidden",
        overflowY: "auto",
        paddingRight: "20px",
      }}
    >
      <RadioItem
        title={"Server"}
        data={[...listData].filter((d) => d.type === TAG_TYPE.SERVER)}
        handleChangeServer={handleChangeServer}
        open={true}
      />

      <RenderItem
        title={"Character"}
        data={[...listData].filter((d) => d.type === TAG_TYPE.CHARACTER)}
        handleFilter={handleFilter}
        open={true}
      />

      <RenderItem
        title={"Weapon"}
        data={[...listData].filter((d) => d.type === TAG_TYPE.WEAPON)}
        handleFilter={handleFilter}
        open={false}
      />
    </Box>
  );
}
