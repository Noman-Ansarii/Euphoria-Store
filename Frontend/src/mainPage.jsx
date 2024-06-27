import React from "react";
import HomePage from "./Pages/HomePage";
import OfferCard from "./Pages/OfferCard";
import LatestItems from "./Pages/LatestItems";
import GridCard from "./Pages/GridCard";
import Categorie from "./Pages/Categorie";
import Brand from "./Pages/Brand";
import LimeCate from "./Pages/LimeCate";
import Testimonial from "./Pages/Testimonial";
import Footer from "./Pages/Footer";

function mainPage() {
  return (
    <>
      <HomePage />
      <OfferCard />
      <LatestItems />
      <GridCard />
      <Categorie />
      <Brand />
      <LimeCate />
      <Testimonial />
    </>
  );
}

export default mainPage;
