import Blogs2 from "@/components/common/Blogs2";
import Brands from "@/components/common/Brands";
import CarBrands from "@/components/common/CarBrands";
import Categories2 from "@/components/common/Categories2";
import Cta from "@/components/common/Cta";
import Features from "@/components/homes/home-4/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

import Cars3 from "@/components/homes/home-9/Cars3";
import Hero from "@/components/homes/home-9/Hero";
import Testimonials from "@/components/homes/home-7/Testimonials";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import LoanCalculaator from "@/components/homes/home-6/Banner2";
import LoanCalculator from "@/components/homes/home-1/LoanCalculator";
import CarReview from "@/components/common/CarReview";
import Categories from "@/components/common/Categories";
import CarBrands2 from "@/components/common/CarBrands2";
import Features2 from "@/components/homes/home-2/Features2";
import Cars from "@/components/homes/home-2/Cars";
import Cars2 from "@/components/homes/home-2/Cars2";
import FaqPage from "@/pages/other-pages/faq";
import Faqs from "@/components/otherPages/Faqs";
import InfoVideoBanner from "@/components/homes/home-9/InfoVideoBanner";
const metadata = {
  title: "Sayarti",
  description: "AutoDeal - Car Dealer, Rental & Listing Reactjs Template",
};
export default function HomePage9() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-fixed">
        <Header1 />
      </div>
      <Hero />
      <Categories2 />
      <div className="mt-5 pt-5"></div>
      <Cta />
      <CarReview />
      <div className="mt-5 pt-5"></div>
      <Cars2 parentClass="tf-section3" />
      <Cars parentClass="tf-section3" />
      <Features />
      <div className="mt-5 pt-5"></div>
      <LoanCalculator />
      <div className="mt-5 pt-5"></div>
      <InfoVideoBanner />
      <div className="mt-5 pt-5"></div>
      <Cars3 />
      <Testimonials />
      <div className="mt-5 pt-5"></div>
      <Brands />
      <Faqs />
      <Footer1 />
    </>
  );
}
