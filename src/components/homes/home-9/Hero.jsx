import FlatFilter2 from "@/components/common/FlatFilter2";
import React from "react";

export default function Hero() {
  return (
    <div className="mainslider slider home9">
      <div className="container relative">
        <div className="row">
          <div className="col-lg-12">
            <div className="content po-content-two">
              <div className="heading center text-center">
                <div
                  className="sub-title2 fs-20 fw-3 lh-25 text-color-1 wow fadeInUp"
                  data-wow-delay="0ms"
                  data-wow-duration="1200ms"
                >
                  Over 95,000 classified ads listing
                </div>
                <h1
                  className="wow fadeInUp js-letters text-color-1"
                  data-wow-delay="200ms"
                  data-wow-duration="1200ms"
                >
                  Find what are you looking for
                </h1>

                <a
                  href="https://www.youtube.com/watch?v=YuzClM_OAO0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn text-white d-flex align-items-center justify-content-center gap-2 px-3 py-2 rounded-3 shadow-sm mx-auto mt-5"
                  style={{ backgroundColor: "#ff7017", width: "200px" }}
                >
                  {/* SVG Icon - White Play Button */}
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Watch Video</span>
                </a>
              </div>

              {/* filter */}
              <div className="flat-filter-search home9">
                <div className="flat-tabs">
                  <FlatFilter2
                    styleClass="style2"
                    justifyClass="justify-center"
                    tabStyle="style2"
                  />
                </div>
              </div>
              <div className="wrap-icon flex align-center link-style-3 justify-center">
                <div className="icon-box text-color-1 font">
                  <span className="icon-autodeal-suv" />
                  <a href="#">Truk</a>
                </div>
                <div className="icon-box text-color-1 font">
                  <span className="icon-autodeal-coupe" />
                  <a href="#">Van</a>
                </div>
                <div className="icon-box text-color-1 font">
                  <span className="icon-autodeal-hatchback" />
                  <a href="#">Bus</a>
                </div>
                <div className="icon-box text-color-1 font">
                  <span className="icon-autodeal-hybrid" />
                  <a href="#">Hybrid</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
