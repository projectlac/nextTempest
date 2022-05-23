import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import tagApi from "../../../../../api/tag";

interface AccordionProp {
  title: string;
  data: any;
  handleFilter: (data: string, active: boolean) => void;
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
    handleFilter(data, e.target.checked);
  };

  return (
    <Box>
      <Accordion expanded={expanded === true} onChange={handleChange()}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {(data || []).map((d) => (
              <CheckboxCustom
                key={d.id}
                control={<Checkbox />}
                label={d.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChoose(e, d.title);
                }}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
enum TAG_TYPE {
  SERVER = "SERVER",
  CHARACTER = "CHARACTER",
  WEAPON = "WEAPON",
}
export default function CustomizedAccordions() {
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

  const [selectedFilter, setSelectedFilter] = React.useState([]);
  const handleFilter = (data: string, active: boolean) => {
    const tempSelected = [...selectedFilter];
    if (active) {
      tempSelected.push(data);
      setSelectedFilter(tempSelected);
    } else {
      const index = tempSelected.indexOf(data);
      if (index !== -1) {
        tempSelected.splice(index, 1);
        setSelectedFilter(tempSelected);
      }
    }
  };
  return (
    <Box
      sx={{
        height: "1200px",
        overflow: "hidden",
        overflowY: "auto",
        paddingRight: "20px",
      }}
    >
      <RenderItem
        title={"Server"}
        data={[...listData].filter((d) => d.type === TAG_TYPE.SERVER)}
        handleFilter={handleFilter}
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
