/* eslint-disable react/no-array-index-key */
// Assuming you are using fetch to load the JSON file
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  Grid,
  useTheme,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CloseIcon from "@mui/icons-material/Close";

const Image = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  overflow: "hidden",
  maxHeight: "700px",
  width: "405px",
}));

const Price = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
  [theme.breakpoints.up("sm")]: {
    textAlign: "center",
  },
  "&::before": {
    content: '"€"',
  },
  "&:hover": {
    color: theme.palette.primary.red,
  },
  margin: 1,
}));

const PriceBottle = styled("span")(({ theme }) => ({
  // background: theme.palette.secondary.main,
  fontSize: "2rem",
  color: theme.palette.primary.main,
  "&:hover": {
    color: theme.palette.primary.red,
  },
  "&:before": { content: '"/ €"' },
}));
const PriceContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
}));

const Ingredients = styled(Typography)(({ theme }) => ({
  // whiteSpace: "normal",
  // marginLeft: theme.spacing(2),
  marginTop: 25,
  fontSize: "1.2rem",
  transition: "transform 0.3s",
  textAlign: "right",
  "&:hover": {
    color: theme.palette.primary.red,
  },
  [theme.breakpoints.up("xs")]: {
    textAlign: "center",
    marginTop: 5,
  },
}));

function ModalMenuItem({ item, onClose, englishItem }) {
  const handleDialogContentClick = (event) => {
    // Stops the click event from propagating up to other elements
    event.stopPropagation();
    onClose();
  };

  const [menuItem, setmenuItem] = useState(item);

  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setShowProgress(false);
  };

  return (
    <Dialog open={!!menuItem} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        bgcolor="primary.main"
        color="text.light"
        mb={2}
        variant={isSmallScreen ? "h6" : "h4"}
        component={isSmallScreen ? "h4" : "h2"}
        align="center"
      >
        {menuItem.menuNumber} {menuItem ? menuItem?.title : ""}
      </DialogTitle>
      <DialogContent onClick={handleDialogContentClick}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              position: "relative",
              textAlign: "center",
            }}
          >
            {englishItem?.image ? (
              showProgress ? (
                <CircularProgress sx={{ py: 10 }} size={75} />
              ) : (
                <Image
                  src={englishItem?.image}
                  alt={englishItem?.title}
                  onLoad={handleImageLoad}
                />
              )
            ) : null}
          </Grid>
          <Grid
            item
            xs={12}
            sm={englishItem?.image ? 6 : 12}
            sx={{ py: 1, pl: 1 }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "flex-start",
              }}
            >
              <PriceContainer>
                <Price variant="h5">{englishItem.price}</Price>
                {englishItem.price1 && (
                  <PriceBottle>{englishItem.price1}</PriceBottle>
                )}
              </PriceContainer>
              {englishItem?.per && (
                <Ingredients> for {englishItem.per}</Ingredients>
              )}
              {englishItem?.weight && (
                <Ingredients>
                  {" "}
                  {englishItem.weight} {returnMesurements(englishItem.category)}
                </Ingredients>
              )}
              {menuItem?.ingredients && (
                <Ingredients>{menuItem.ingredients}</Ingredients>
              )}
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 1 }}>
            <Stack
              direction={"row"}
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <PriorityHighIcon />

              <Typography variant="body2" color="grey" lineHeight={1}>
                {t("menu.differ")}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <CloseIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalMenuItem;
