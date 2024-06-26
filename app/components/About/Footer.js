import React from "react";
import Image from "next/image";
import { styled } from "@mui/system";
import { Grid, ButtonBase, Link as MuiLink, Typography } from "@mui/material";
import DefaultButton from "@app/components/common/DefaultButton";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { useTranslation } from "react-i18next";

const Section = styled("section")(({ theme }) => ({
  padding: theme.spacing(3, 5, 1, 5),
  borderTop: `1px solid ${theme.palette.secondary.grey}`,
  textAlign: "center",
  background: theme.palette.secondary.background,
  backdropFilter: "blur(50px)",
  color: theme.palette.text.dark,
}));

const FooterContainer = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  backgroundColor: "transparent",
  color: "#fff",
  padding: "20px 0",
});

const Logo = styled("div")({
  margin: 20,
});

const CopyRight = styled("div")({
  fontSize: "14px",
  paddingTop: "1rem",
});
const ContactInfo = styled(Grid)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "1rem",
}));
const ContactIcon = styled("span")(({ theme }) => ({
  margin: theme.spacing(13, 1),
  verticalAlign: "center",
}));

const Footer = () => {
  const emails = ["nataliakireewa@gmail.com", "ntf.elcor@gmail.com"];
  const tels = ["+30 697 566 1980", "+30 697 566 1979", "+38 068 100 3771"];

  const { t } = useTranslation();

  return (
    <Section>
      <FooterContainer mb={4}>
        <Logo>
          <Image src="/logo_white1.png" alt="logo" width={113} height={70} />{" "}
        </Logo>
        <ContactInfo container spacing={2}>
          <DefaultButton
            label={t("pres.footer.1")}
            relative={true}
            minWidth="100%"
            startIcon={<HistoryEduIcon />}
            href={`mailto:${emails[0]}`}
            target="_blank"
            rel="noopener noreferrer"
          />
          <Grid item xs={12} sm={6}>
            <ContactIcon>
              <EmailIcon style={{ marginBottom: 19 }} />
            </ContactIcon>
            <Grid container direction="column" spacing={2}>
              {emails.map((email, index) => (
                <a
                  key={index}
                  style={{ fontSize: "1.3rem" }}
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ContactIcon>
              <CallIcon style={{ marginBottom: 19, marginRight: 5 }} />
              <WhatsAppIcon style={{ marginBottom: 19, marginRight: 5 }} />
              <TelegramIcon style={{ marginBottom: 19 }} />
            </ContactIcon>
            <Grid container direction="column" spacing={2}>
              {tels.map((tel, index) => (
                <a
                  key={index}
                  style={{ fontSize: "1.3rem" }}
                  href={`tel:${tel}`}
                >
                  {tel}
                </a>
              ))}
            </Grid>
          </Grid>
        </ContactInfo>

        <CopyRight>
          <p>© 2023. All rights reserved.</p>
        </CopyRight>
      </FooterContainer>
    </Section>
  );
};

export default Footer;
