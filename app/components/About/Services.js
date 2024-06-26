"use client";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
//= Scripts
import cardMouseEffect from "@/common/cardMouseEffect";
import { useTranslation } from "react-i18next";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Styled component for the section
const Section = styled("section")({
  backgroundColor: "transparent",
  padding: "50px 0",
  overflow: "hidden",
});

// Styled component for the item
const Item = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingTop: 15,
  margin: 0,
  borderRadius: "10px",
  boxShadow: theme.palette.primary.main,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 6px 15px #111627",
  },
}));

const Features = () => {
  useEffect(() => {
    cardMouseEffect(document.querySelectorAll(".feat .items"));
  }, []);
  const { t } = useTranslation();

  const features = [
    {
      title: t("pres.page3.3"),
      description: t("pres.page3.3a"),
    },
    {
      title: t("pres.page3.4"),
      description: t("pres.page3.4a"),
    },
    {
      title: t("pres.page3.6"),
      description: t("pres.page3.6a"),
    },
    {
      title: t("pres.page3.7"),
      description: t("pres.page3.7a"),
    },
    {
      title: t("pres.page3.8"),
      description: t("pres.page3.8a"),
    },
    {
      title: t("pres.page3.9"),
      description: t("pres.page3.9a"),
    },
    {
      title: t("pres.page3.10"),
      description: t("pres.page3.10a"),
    },
    {
      title: t("pres.page3.11"),
      description: t("pres.page3.11a"),
    },
  ];

  return (
    <Section className="feat">
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12}>
            <Typography
              variant="h6"
              align="left"
              sx={{
                mb: 2,
                fontSize: "22px",
                lineHeight: "1.5",
                marginBottom: "20px",
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}
            >
              {t("pres.page3.1")}
            </Typography>
            <Typography
              variant="h4"
              align="left"
              color="primary.main"
              sx={{ fontWeight: 700, textTransform: "uppercase", mb: 5 }}
              className="color-font"
            >
              {t("pres.page3.2")}
            </Typography>
          </Grid>
        </Grid>

        {features.map((feature, index) => (
          <Accordion
            key={index}
            sx={{
              justifyContent: "center",
              color: "white",
              backgroundColor: "transparent",
            }}
          >
            <AccordionSummary
              expandIcon={
                <IconButton sx={{ color: "white" }}>
                  <ExpandMoreIcon />
                </IconButton>
              }
              className="item color-font"
            >
              <Image
                src="/favicon.png"
                alt="logo_bbqr"
                width={46}
                height={45}
                className="spinning-icon"
              />
              <Typography variant="h5" sx={{ mt: 0.5 }}>
                {feature.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h5" color="text.light">
                {feature.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Section>
  );

  // return (
  //   <Section className="feat">
  //     <Container>
  //       <Grid container justifyContent="center">
  //         <Grid item xs={12}>
  //           <Typography
  //             variant="h6"
  //             align="start"
  //             sx={{
  //               mb: 2,
  //               fontSize: "22px",
  //               lineHeight: "1.5",
  //               marginBottom: "20px",
  //               letterSpacing: "5px",
  //               textTransform: "uppercase",
  //             }}
  //           >
  //             {t("pres.page3.1")}
  //           </Typography>
  //           <Typography
  //             variant="h4"
  //             align="start"
  //             color="primary.main"
  //             sx={{ fontWeight: 700, textTransform: "uppercase" }}
  //             className="color-font"
  //           >
  //             {t("pres.page3.2")}
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //       <Grid container spacing={1}>
  //         {features.map((feature, index) => (
  //           <Grid
  //             item
  //             xs={12}
  //             sm={4}
  //             md={3}
  //             key={index}
  //             className="items"
  //             columnSpacing={0}
  //           >
  //             <Fade
  //               in
  //               timeout={500}
  //               style={{ transitionDelay: `${index * 150}ms` }}
  //             >
  //               <Item className="item">
  //                 <Image
  //                   src="/favicon.png"
  //                   alt="logo_bbqr"
  //                   width={49}
  //                   height={45}
  //                   className="spinning-icon"
  //                 />
  //                 <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
  //                   {feature.title}
  //                 </Typography>
  //                 <Typography>{feature.description}</Typography>
  //                 {/* <Link href={feature.link} className="more-stroke">
  //                   <span></span>
  //                 </Link> */}
  //               </Item>
  //             </Fade>
  //           </Grid>
  //         ))}
  //       </Grid>
  //     </Container>
  //   </Section>
  // );
};

export default Features;
