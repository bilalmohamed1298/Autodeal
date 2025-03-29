import React from "react";
import { Link, useLocation } from "react-router-dom";
import { blogPages, homepages, listingPages, otherPages } from "@/data/menu";

export default function Nav() {
  const { pathname } = useLocation();
  const isActive = (menus) => {
    let active = false;

    menus.forEach((elm) => {
      if (elm.links) {
        elm.links.forEach((elm2) => {
          if (elm2.href.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        });
      } else {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          active = true;
        }
      }
    });
    return active;
  };
  return (
    <>
      <li
        className={`tf-megamenu ${
          isActive(homepages) ? "current" : ""
        } `}
      >
        <Link to={`/home`}>Home</Link>
      </li>
      <li
        className={`tfcl-mega-menu ${
          isActive(listingPages) ? "current" : ""
        } `}
      >
        <Link to={"/listing-car"}>Listing Car</Link>
      </li>
      <li className={`${isActive(otherPages) ? "current" : ""} `}>
      <Link to={'/about-us'}>About Us</Link>

      </li>
      <li className={"contact" == pathname.split("/")[1] ? "current" : ""}>
        <Link to={`/contact`}>Contact</Link>
      </li>
    </>
  );
}
