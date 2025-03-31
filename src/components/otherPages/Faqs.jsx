import { feeItems, supportItems, toggleItems } from "@/data/faqs";
import React from "react";
import Accordion from "../common/Accordions";

export default function Faqs() {
  return (
    <section className="tf-section3 flat-property">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner-heading flex-two flex-wrap gap-20">
              <h1 className="heading-listing">Frequently asked questions</h1>
            </div>
          </div>
          <div className="col-lg-12 mb-50">
            <div className="flat-accordion">
              <Accordion faqData={toggleItems} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
