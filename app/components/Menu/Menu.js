"use client";
import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Element, Link } from "react-scroll";
import { useMainContext } from "@app/components/MainContextProvider";
import MenuItemComponent from "./MenuItemComponent";
import {
  getUniqueCategories,
  getSubcategories,
  filterMenuItemsId,
  getLangMenu,
} from "@utils/functions";
import { useTranslation } from "react-i18next";
import FilterList from "./FilterList";
import SubFilter from "./SubFilter";
import ClickableMenuItem from "./ClickableMenuItem";

const SectionTitle = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.text.light,
  fontFamily: theme.typography.h1.fontFamily,
  fontSize: 65,
  marginBottom: theme.spacing(0.1),
  marginTop: theme.spacing(0.1),
}));

const Section = styled("section")(({ theme }) => ({
  background: theme.palette.secondary.background,
  padding: theme.spacing(1, 0),
  textAlign: "center",
}));

const FilterListContainer = styled("div")(({ showCallWaiterButton }) => ({
  overflowY: "auto",
  maxHeight: "100vh",
  position: "sticky",
  zIndex: 1000,
  top: 0,
}));

function Menu({ menuRef, headerRef, menuData }) {
  const gridRef = useRef(null);
  const {
    lang,
    showInitialHeader,
    isSmallScreen,
    onlyMenuFromParams,
    setOnlyMenu,
  } = useMainContext();

  const { t, i18n } = useTranslation();
  const { restName } = menuData.menu;

  const menu = getLangMenu(menuData.menuUpd, i18n.language);

  const headerOffset = headerRef?.clientHeight;
  const [activeFilter, setActiveFilter] = useState("*");
  const [activeFilterId, setActiveFilterId] = useState("*");
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [activeSubFilterId, setActiveSubFilterId] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [subCategoriesId, setSubCategoriesId] = useState(null);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    if (activeFilter === "*") {
      setFilteredMenuItems(getLangMenu(menuData.menuUpd, i18n.language));
    } else {
      const filteredItemsId = filterMenuItemsId(
        menuData.menuUpd,
        activeFilterId,
        i18n.language,
        null,
        onlyMenuFromParams
      );
      console.log("22222------", filteredItemsId);
      setFilteredMenuItems(filteredItemsId);

      const subcategoriesResult = getSubcategories(
        menuData.menuUpd,
        menuData.categories,
        activeFilterId,
        i18n.language
      );

      const subCategories = subcategoriesResult?.name;
      const subCategoriesIds = subcategoriesResult?.ids;

      setSubCategoriesId(subCategoriesIds);
      setSubCategories(subCategories);
    }
  }, [
    activeFilter,
    i18n.language,
    activeFilterId,
    menuData.categories,
    menuData.menuUpd,
  ]);

  const [subCatLen, setSubCatLen] = useState(subCategories?.length || 0);

  const [filteredCats, setFilteredCats] = useState(null);
  useEffect(() => {
    const uniqueCategories = getUniqueCategories(
      menuData.menuUpd,
      i18n.language,
      menuData.categories,
      onlyMenuFromParams,
      filteredMenuItems
    );
    setFilteredCats(uniqueCategories);
    console.log(uniqueCategories);
    // eslint-disable-next-line
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight * 0.75;
      if (scrollY > viewportHeight) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Section id="menu" ref={menuRef}>
        <Link to="menu-items" offset={-130} smooth>
          <SectionTitle variant="h3">{t("menu.Menu")}</SectionTitle>
        </Link>
        <Element name="menu-list">
          <FilterListContainer>
            <FilterList
              uniqueCategories={filteredCats}
              setActiveFilter={setActiveFilter}
              setActiveFilterId={setActiveFilterId}
              gridRef={gridRef}
              showCallWaiterButton={showInitialHeader}
              activeFilterId={activeFilterId}
              menu={menuData.menuUpd}
              onlyMenuFromParams={onlyMenuFromParams}
            />
            <SubFilter
              menu={menuData.menuUpd}
              activeSubFilterId={activeSubFilterId}
              setActiveSubFilterId={setActiveSubFilterId}
              filterMenuItemsId={filterMenuItemsId}
              isVisible={subCatLen > 1}
              activeFilterId={activeFilterId}
              subCategories={subCategories}
              setActiveSubFilter={setActiveSubFilter}
              subCategoriesId={subCategoriesId}
              setFilteredMenuItems={setFilteredMenuItems}
              lang={i18n.language}
            />
          </FilterListContainer>
          <Element name="menu-items">
            <Container>
              <Grid container spacing={2} ref={gridRef}>
                {filteredMenuItems.map((menuItem, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <ClickableMenuItem
                      item={menuItem}
                      menu={menuData.menuUpd}
                      isSmallScreen={isSmallScreen}
                      restName={restName}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Element>
        </Element>
      </Section>
    </>
  );
}
export default Menu;
