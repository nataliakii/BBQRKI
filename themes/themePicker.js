import { createTheme } from "@mui/material/styles";
import genesisTheme from "@themes/genesisTheme";
import corleoneTheme from "@themes/corleoneTheme";
import jukeboxTheme from "@themes/jukeboxTheme";
import gelissimoTheme from "@themes/gelissimoTheme";
import argoTheme from "@themes/argoTheme";
import belvedereTheme from "@themes/belvedereTheme";
import twinsTheme from "@themes/twinsTheme";
import saharaTheme from "@themes/saharaTheme";
import justTheme from "@themes/justTheme";
import bloomTheme from "@themes/bloomTheme";
import coffeewavesTheme from "@themes/coffeewavesTheme";
import mangataTheme from "@themes/mangataTheme";

export const returnTheme = (themeName) => {
  if (themeName === "themeBelvedere") return createTheme(belvedereTheme);
  if (themeName === "themeGenesis") return createTheme(genesisTheme);
  if (themeName === "corleoneTheme") return createTheme(corleoneTheme);
  if (themeName === "jukeboxTheme") return createTheme(jukeboxTheme);
  if (themeName === "gelissimoTheme") return createTheme(gelissimoTheme);
  if (themeName === "twinsTheme") return createTheme(twinsTheme);
  if (themeName === "saharaTheme") return createTheme(saharaTheme);
  if (themeName === "justTheme") return createTheme(justTheme);
  if (themeName === "bloomTheme") return createTheme(bloomTheme);
  if (themeName === "coffeewavesTheme") return createTheme(coffeewavesTheme);
  if (themeName === "mangataTheme") return createTheme(mangataTheme);
  return createTheme(themeName);
};
