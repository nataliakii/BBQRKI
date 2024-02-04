"use client";

import React, { useState } from "react";
import { Grid, ButtonBase, Link as MuiLink, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { animateScroll as scroll } from "react-scroll";
import { useRouter } from "next/router";
import NextLink from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import DefaultButton from "@app/components/DefaultButton";
import DirectionsIcon from "@mui/icons-material/Directions";

const Section = styled("section")(({ theme }) => ({
  padding: theme.spacing(5),
  borderTop: `1px solid ${theme.palette.secondary.grey}`,
  textAlign: "center",
  background: theme.palette.secondary.background1
    ? theme.palette.secondary.background1
    : theme.palette.secondary.background,
  backdropFilter: blur("50px"),
  color: theme.palette.text.dark,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontSize: "54px",
  marginBottom: theme.spacing(2),
}));

const Slogan = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "32px",
  marginBottom: theme.spacing(2),
}));

const FooterContainer = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  fontFamily: theme.typography.fontFamily,
}));

const SocialLinks = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const ContactInfo = styled(Grid)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "17px",
}));

const ContactIcon = styled("span")(({ theme }) => ({
  marginRight: theme.spacing(1),
  verticalAlign: "middle",
}));

const CopyrightInfo = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: "14px",
  opacity: 0.8,
}));

function Footer({ rest }) {
  // const { contacts } = useMyContext();
  const { name, slogan, tel, email, address, coords } = rest;
  const loc = coords.mainSpot;
  // const router = useRouter();

  const handleClick = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${loc.latitude},${loc.longitude}`,
      "_blank"
    );
  };

  return (
    <Section>
      <FooterContainer>
        <SectionTitle variant="h3">{name}</SectionTitle>
        <Slogan>{slogan}</Slogan>
        <SocialLinks>
          <MuiLink href="#" color="inherit" target="_blank">
            <FacebookIcon fontSize="large" />
          </MuiLink>
          <MuiLink href="#" color="inherit" target="_blank">
            <TwitterIcon fontSize="large" />
          </MuiLink>
          <MuiLink href="#" color="inherit" target="_blank">
            <InstagramIcon fontSize="large" />
          </MuiLink>
          <MuiLink href="#" color="inherit" target="_blank">
            <LinkedInIcon fontSize="large" />
          </MuiLink>
          <MuiLink href="#" color="inherit" target="_blank">
            <GitHubIcon fontSize="large" />
          </MuiLink>
        </SocialLinks>
        <ContactInfo container spacing={2}>
          <DefaultButton
            onClick={handleClick}
            label="Get Directions"
            relative={true}
            minWidth="100%"
            startIcon={<DirectionsIcon />}
            target="_blank"
            rel="noopener noreferrer"
          />
          <Grid item xs={12} md={4}>
            <ContactIcon>
              <LocationOnIcon />
            </ContactIcon>
            {address}
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactIcon>
              <EmailIcon />
            </ContactIcon>
            <a href={`mailto:${email}`}>{email}</a>
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactIcon>
              <CallIcon />
            </ContactIcon>
            <a href={`tel:${tel}`}>{tel}</a>
          </Grid>
        </ContactInfo>
        <CopyrightInfo>{/* <Copyright /> */}</CopyrightInfo>
      </FooterContainer>
    </Section>
  );
}

export default Footer;
