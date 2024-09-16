import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

export default function Questions_Answers() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <div>
            <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400 } }}
                sx={{
                    '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                    '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                    backgroundColor: '#e7eff6',
                    // backgroundColor: '#d3e2e9',
                    width: '60vw',
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography>1. Is it possible to connect from several devices?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        We understand the students' need to connect from several devices and that's why we made it possible.
                        However, if we detect an unusual connection the user will be blocked immediately.
                        The same user cannot log in from two devices at the same time.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{ backgroundColor: '#e7eff6', width: '60vw' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>2. How can I pay?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Payment is made via credit card or Bit.
                        Credit clearing is done through Cardcom, the most advanced and secure credit clearing company in Israel.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{ backgroundColor: '#e7eff6', width: '60vw' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>3. How long is the course open for me?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        According to our refund policy, a refund can be received within 14 days if no viewing has been done on behalf of the user of the content.
                        To receive a refund you must contact the company.
                        As stated in the law, a cancellation fee of 5% of the transaction price, or NIS 100 - whichever is lower, will be charged.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{ backgroundColor: '#e7eff6', width: '60vw' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"

                >
                    <Typography>4. Is it possible to get a refund?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Payment is made via credit card or Bit.
                        Credit clearing is done through Cardcom, the most advanced and secure credit clearing company in Israel.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{ backgroundColor: '#e7eff6', width: '60vw' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>5. How do I get access to the course?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Immediately after payment and filling in the details, you will receive an email with your user details and a direct link to the course you purchased.
                        Pay attention to fill in your email details accurately!
                        If you have purchased a course from him in the past, log in with the username and password you already have. If you forgot the password. You can click on password recovery.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{ backgroundColor: '#e7eff6', width: '60vw' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>6. Unable to log in with my password</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        You can reset your password at any given time here at this link:
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}