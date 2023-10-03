import {
  Accordion as MUIAccordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  id: string;
  expandIcon?: any;
  heading: string;
  children: any;
  sx?: object;
};

const Accordion = ({ id, expandIcon, heading, children, sx }: Props) => {
  return (
    <MUIAccordion sx={sx}>
      <AccordionSummary
        id={id}
        aria-controls="add-comment"
        expandIcon={expandIcon ?? <ExpandMoreIcon />}
      >
        <Typography>{heading}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MUIAccordion>
  );
};

export default Accordion;
